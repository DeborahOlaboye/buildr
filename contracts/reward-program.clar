;; reward-program.clar
;; Manages monthly builder reward programs and on-chain STX distribution.
;;
;; Lifecycle:
;;   create-program → (open period) → finalise-program → distribute-rewards
;;
;; The admin (contract owner) creates a program with a prize pool funded at
;; creation time. After the program period ends, the admin finalises it and
;; calls distribute-rewards once per winner, in rank order, until all STX
;; in the prize pool has been paid out.
;;
;; Reward schedule (top 50, 15,000 STX pool):
;;   Rank 1–3   : 750 STX each  (total 2,250)
;;   Rank 4–10  : 300 STX each  (total 2,100)
;;   Rank 11–25 : 200 STX each  (total 3,000)
;;   Rank 26–50 : 150 STX each  (total 3,750 → 25 × 150)
;;   Remainder of pool distributed equally among ranks 26-50 = 149 residual goes to DAO treasury
;;
;; All STX amounts are stored in micro-STX (1 STX = 1,000,000 uSTX).

;; ─── Constants ────────────────────────────────────────────────────────────────

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED       (err u300))
(define-constant ERR-PROGRAM-NOT-FOUND   (err u301))
(define-constant ERR-PROGRAM-NOT-OPEN    (err u302))
(define-constant ERR-PROGRAM-NOT-FINAL   (err u303))
(define-constant ERR-ALREADY-DISTRIBUTED (err u304))
(define-constant ERR-NO-WINNER           (err u305))
(define-constant ERR-INSUFFICIENT-FUNDS  (err u306))
(define-constant ERR-INVALID-RANK        (err u307))
(define-constant ERR-TRANSFER-FAILED     (err u308))

;; Program status values
(define-constant STATUS-OPEN      u1)
(define-constant STATUS-FINALISED u2)
(define-constant STATUS-CLOSED    u3)

;; Max winners per program
(define-constant MAX-WINNERS u50)

;; Reward tiers in uSTX (1 STX = 1_000_000 uSTX)
(define-constant REWARD-TIER-1  u750000000)   ;; ranks 1-3:   750 STX
(define-constant REWARD-TIER-2  u300000000)   ;; ranks 4-10:  300 STX
(define-constant REWARD-TIER-3  u200000000)   ;; ranks 11-25: 200 STX
(define-constant REWARD-TIER-4  u150000000)   ;; ranks 26-50: 150 STX

;; ─── Data Maps & Vars ─────────────────────────────────────────────────────────

(define-data-var next-program-id uint u1)

(define-map programs
  uint   ;; program-id
  {
    name:              (string-ascii 64),
    total-prize-ustx:  uint,
    winner-count:      uint,
    start-block:       uint,
    end-block:         uint,
    status:            uint,    ;; STATUS-OPEN | STATUS-FINALISED | STATUS-CLOSED
    distributed-count: uint,    ;; how many rewards have been paid out
    remaining-ustx:    uint,    ;; prize pool balance
  }
)

;; Tracks whether a specific (program-id, rank) reward has been distributed
(define-map reward-distributed
  { program-id: uint, rank: uint }
  bool
)

;; Treasury address for any leftover pool balance
(define-data-var treasury-address principal CONTRACT-OWNER)

;; ─── Private Helpers ──────────────────────────────────────────────────────────

(define-private (is-owner)
  (is-eq tx-sender CONTRACT-OWNER)
)

(define-private (reward-for-rank (rank uint))
  (if (<= rank u3)
    REWARD-TIER-1
    (if (<= rank u10)
      REWARD-TIER-2
      (if (<= rank u25)
        REWARD-TIER-3
        REWARD-TIER-4
      )
    )
  )
)

;; ─── Public Functions ─────────────────────────────────────────────────────────

;; Create a new reward program. The caller must attach the full prize pool
;; in STX. The contract holds the funds until distribution.
(define-public (create-program
    (name         (string-ascii 64))
    (winner-count uint)
    (start-block  uint)
    (end-block    uint)
    (prize-ustx   uint)
  )
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (asserts! (<= winner-count MAX-WINNERS) ERR-INVALID-RANK)
    (asserts! (< start-block end-block) ERR-PROGRAM-NOT-FOUND)
    ;; Transfer prize pool from admin to this contract
    (try! (stx-transfer? prize-ustx tx-sender (as-contract tx-sender)))
    (let ((id (var-get next-program-id)))
      (map-set programs id
        {
          name:              name,
          total-prize-ustx:  prize-ustx,
          winner-count:      winner-count,
          start-block:       start-block,
          end-block:         end-block,
          status:            STATUS-OPEN,
          distributed-count: u0,
          remaining-ustx:    prize-ustx,
        }
      )
      (var-set next-program-id (+ id u1))
      (ok id)
    )
  )
)

;; Mark a program as finalised so distribution can begin.
;; Called by admin after off-chain scores have been submitted to
;; builder-scores.clar and the leaderboard is ready.
(define-public (finalise-program (program-id uint))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((program (unwrap! (map-get? programs program-id) ERR-PROGRAM-NOT-FOUND)))
      (asserts! (is-eq (get status program) STATUS-OPEN) ERR-PROGRAM-NOT-OPEN)
      (map-set programs program-id
        (merge program { status: STATUS-FINALISED })
      )
      (ok true)
    )
  )
)

;; Distribute the reward for a single rank to the builder at that rank.
;; `builder` must match what is recorded in builder-scores.clar (caller
;; is responsible for passing the correct address — validated off-chain
;; then posted here by the admin/oracle).
(define-public (distribute-reward
    (program-id uint)
    (rank       uint)
    (builder    principal)
  )
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (asserts! (and (> rank u0) (<= rank MAX-WINNERS)) ERR-INVALID-RANK)
    (asserts! (is-none (map-get? reward-distributed { program-id: program-id, rank: rank }))
              ERR-ALREADY-DISTRIBUTED)
    (let (
      (program (unwrap! (map-get? programs program-id) ERR-PROGRAM-NOT-FOUND))
      (amount  (reward-for-rank rank))
    )
      (asserts! (is-eq (get status program) STATUS-FINALISED) ERR-PROGRAM-NOT-FINAL)
      (asserts! (<= rank (get winner-count program)) ERR-INVALID-RANK)
      (asserts! (>= (get remaining-ustx program) amount) ERR-INSUFFICIENT-FUNDS)

      ;; Pay the builder
      (try! (as-contract (stx-transfer? amount tx-sender builder)))

      ;; Update accounting
      (map-set reward-distributed { program-id: program-id, rank: rank } true)
      (map-set programs program-id
        (merge program {
          distributed-count: (+ (get distributed-count program) u1),
          remaining-ustx:    (- (get remaining-ustx program) amount),
        })
      )
      (ok amount)
    )
  )
)

;; After all rewards are distributed, sweep any residual balance to treasury
;; and mark the program closed.
(define-public (close-program (program-id uint))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((program (unwrap! (map-get? programs program-id) ERR-PROGRAM-NOT-FOUND)))
      (asserts! (is-eq (get status program) STATUS-FINALISED) ERR-PROGRAM-NOT-FINAL)
      (let ((residual (get remaining-ustx program)))
        (if (> residual u0)
          (try! (as-contract (stx-transfer? residual tx-sender (var-get treasury-address))))
          true
        )
        (map-set programs program-id
          (merge program { status: STATUS-CLOSED, remaining-ustx: u0 })
        )
        (ok true)
      )
    )
  )
)

;; Update the treasury address (admin only).
(define-public (set-treasury (new-treasury principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (var-set treasury-address new-treasury)
    (ok true)
  )
)

;; ─── Read-Only Functions ──────────────────────────────────────────────────────

(define-read-only (get-program (program-id uint))
  (map-get? programs program-id)
)

(define-read-only (get-current-program-id)
  (- (var-get next-program-id) u1)
)

(define-read-only (is-reward-distributed (program-id uint) (rank uint))
  (default-to false (map-get? reward-distributed { program-id: program-id, rank: rank }))
)

(define-read-only (get-reward-for-rank (rank uint))
  (reward-for-rank rank)
)

(define-read-only (get-treasury)
  (var-get treasury-address)
)
