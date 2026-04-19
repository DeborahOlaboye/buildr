;; builder-scores.clar
;; Tracks on-chain activity scores for each builder within a given reward
;; program period. Scores are submitted by a trusted oracle (the contract
;; owner) and weighted to produce a final combined score used for ranking.
;;
;; Score formula (per program period):
;;   combined = (contracts-deployed × 60) + (github-contributions × 40)
;;
;; Weights reflect the FAQ: "onchain activity" and "GitHub contributions"
;; are the two scoring categories.

;; ─── Constants ────────────────────────────────────────────────────────────────

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED      (err u200))
(define-constant ERR-NOT-REGISTERED      (err u201))
(define-constant ERR-PROGRAM-NOT-OPEN    (err u202))
(define-constant ERR-SCORE-EXISTS        (err u203))
(define-constant ERR-INVALID-PROGRAM     (err u204))

;; Score weights (basis points out of 100)
(define-constant ONCHAIN-WEIGHT  u60)
(define-constant GITHUB-WEIGHT   u40)

;; ─── Data Maps & Vars ─────────────────────────────────────────────────────────

;; Scores per (program-id, builder)
(define-map builder-program-scores
  { program-id: uint, builder: principal }
  {
    contracts-deployed:    uint,
    github-contributions:  uint,
    combined-score:        uint,
    submitted-at:          uint,   ;; block height
  }
)

;; Leaderboard snapshot: program-id → ordered list of (principal, score) pairs.
;; Stored as a simple map of rank → entry; rank is 1-based.
(define-map leaderboard-entry
  { program-id: uint, rank: uint }
  { builder: principal, combined-score: uint }
)

;; Tracks how many entries have been written for each program leaderboard
(define-map leaderboard-size
  uint   ;; program-id
  uint   ;; count
)

;; ─── Private Helpers ──────────────────────────────────────────────────────────

(define-private (is-owner)
  (is-eq tx-sender CONTRACT-OWNER)
)

(define-private (compute-score
    (contracts-deployed   uint)
    (github-contributions uint)
  )
  (+ (* contracts-deployed ONCHAIN-WEIGHT)
     (* github-contributions GITHUB-WEIGHT))
)

;; ─── Public Functions ─────────────────────────────────────────────────────────

;; Submit (or update) a builder's raw activity for a program period.
;; Only callable by the contract owner (oracle role).
(define-public (submit-score
    (program-id           uint)
    (builder              principal)
    (contracts-deployed   uint)
    (github-contributions uint)
  )
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((score (compute-score contracts-deployed github-contributions)))
      (map-set builder-program-scores
        { program-id: program-id, builder: builder }
        {
          contracts-deployed:   contracts-deployed,
          github-contributions: github-contributions,
          combined-score:       score,
          submitted-at:         block-height,
        }
      )
      (ok score)
    )
  )
)

;; Write a finalised leaderboard entry for a program.
;; Called once per builder after all scores are in; rank is 1-based.
;; The reward-program contract reads these entries to distribute prizes.
(define-public (set-leaderboard-entry
    (program-id uint)
    (rank       uint)
    (builder    principal)
  )
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (asserts! (> rank u0) ERR-INVALID-PROGRAM)
    (let (
      (score-data (unwrap!
        (map-get? builder-program-scores { program-id: program-id, builder: builder })
        ERR-NOT-REGISTERED
      ))
      (current-size (default-to u0 (map-get? leaderboard-size program-id)))
    )
      (map-set leaderboard-entry
        { program-id: program-id, rank: rank }
        { builder: builder, combined-score: (get combined-score score-data) }
      )
      ;; Extend recorded size if needed
      (if (>= rank (+ current-size u1))
        (map-set leaderboard-size program-id rank)
        true
      )
      (ok true)
    )
  )
)

;; ─── Read-Only Functions ──────────────────────────────────────────────────────

(define-read-only (get-score (program-id uint) (builder principal))
  (map-get? builder-program-scores { program-id: program-id, builder: builder })
)

(define-read-only (get-leaderboard-entry (program-id uint) (rank uint))
  (map-get? leaderboard-entry { program-id: program-id, rank: rank })
)

(define-read-only (get-leaderboard-size (program-id uint))
  (default-to u0 (map-get? leaderboard-size program-id))
)

(define-read-only (get-combined-score (program-id uint) (builder principal))
  (match (map-get? builder-program-scores { program-id: program-id, builder: builder })
    entry (some (get combined-score entry))
    none
  )
)
