;; subscription.clar
;; Stacks+ subscription management for the Buildr platform.
;;
;; Tier definitions (prices in uSTX):
;;   free       : 0 STX/month — basic access
;;   pro        : 10 STX/month | 96 STX/year  (Stacks+)
;;   enterprise : custom pricing — admin-granted
;;
;; Subscribers pay STX directly to this contract. The admin can withdraw
;; accumulated revenue to the treasury at any time.

;; ─── Constants ────────────────────────────────────────────────────────────────

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED      (err u400))
(define-constant ERR-INVALID-TIER        (err u401))
(define-constant ERR-ALREADY-SUBSCRIBED  (err u402))
(define-constant ERR-NOT-SUBSCRIBED      (err u403))
(define-constant ERR-WRONG-PAYMENT       (err u404))
(define-constant ERR-SUB-STILL-ACTIVE   (err u405))
(define-constant ERR-TRANSFER-FAILED    (err u406))

;; Tier identifiers
(define-constant TIER-FREE       u0)
(define-constant TIER-PRO        u1)
(define-constant TIER-ENTERPRISE u2)

;; Billing cycle identifiers
(define-constant CYCLE-MONTHLY u0)
(define-constant CYCLE-ANNUAL  u1)

;; Prices in uSTX (1 STX = 1,000,000 uSTX)
(define-constant PRICE-PRO-MONTHLY u10000000)   ;;  10 STX / month
(define-constant PRICE-PRO-ANNUAL  u96000000)   ;;  96 STX / year  (20 % discount)

;; Approximate blocks per billing period (Stacks ~10 min/block)
(define-constant BLOCKS-PER-MONTH u4380)         ;; ≈ 30 days
(define-constant BLOCKS-PER-YEAR  u52560)        ;; ≈ 365 days

;; ─── Data Maps & Vars ─────────────────────────────────────────────────────────

(define-map subscriptions
  principal
  {
    tier:          uint,    ;; TIER-FREE | TIER-PRO | TIER-ENTERPRISE
    billing-cycle: uint,    ;; CYCLE-MONTHLY | CYCLE-ANNUAL (ignored for free/enterprise)
    started-at:    uint,    ;; block height when subscription began
    expires-at:    uint,    ;; block height when subscription expires (0 = never for enterprise)
    auto-renew:    bool,
  }
)

;; Accumulated revenue held by the contract
(define-data-var revenue-ustx uint u0)

;; Treasury / withdrawal address
(define-data-var treasury-address principal CONTRACT-OWNER)

;; ─── Private Helpers ──────────────────────────────────────────────────────────

(define-private (is-owner)
  (is-eq tx-sender CONTRACT-OWNER)
)

(define-private (price-for (billing-cycle uint))
  (if (is-eq billing-cycle CYCLE-ANNUAL)
    PRICE-PRO-ANNUAL
    PRICE-PRO-MONTHLY
  )
)

(define-private (duration-for (billing-cycle uint))
  (if (is-eq billing-cycle CYCLE-ANNUAL)
    BLOCKS-PER-YEAR
    BLOCKS-PER-MONTH
  )
)

(define-private (subscription-active? (sub { tier: uint, billing-cycle: uint, started-at: uint, expires-at: uint, auto-renew: bool }))
  (or
    (is-eq (get tier sub) TIER-ENTERPRISE)    ;; enterprise never expires
    (is-eq (get tier sub) TIER-FREE)          ;; free never expires
    (> (get expires-at sub) block-height)     ;; pro: check expiry
  )
)

;; ─── Public Functions ─────────────────────────────────────────────────────────

;; Subscribe to Stacks+ (pro tier). Caller attaches the exact STX amount.
;; billing-cycle: 0 = monthly, 1 = annual
(define-public (subscribe-pro (billing-cycle uint))
  (begin
    (asserts! (or (is-eq billing-cycle CYCLE-MONTHLY)
                  (is-eq billing-cycle CYCLE-ANNUAL))
              ERR-INVALID-TIER)
    ;; Prevent double-subscribing to an active pro plan
    (match (map-get? subscriptions tx-sender)
      existing (asserts! (not (subscription-active? existing)) ERR-ALREADY-SUBSCRIBED)
      true
    )
    (let (
      (price    (price-for billing-cycle))
      (duration (duration-for billing-cycle))
      (expires  (+ block-height duration))
    )
      (try! (stx-transfer? price tx-sender (as-contract tx-sender)))
      (var-set revenue-ustx (+ (var-get revenue-ustx) price))
      (map-set subscriptions tx-sender
        {
          tier:          TIER-PRO,
          billing-cycle: billing-cycle,
          started-at:    block-height,
          expires-at:    expires,
          auto-renew:    true,
        }
      )
      (ok expires)
    )
  )
)

;; Renew an existing pro subscription. Can be called by the subscriber at
;; any time; adds one billing period onto the current expiry (stacks renewals).
(define-public (renew-pro)
  (let ((sub (unwrap! (map-get? subscriptions tx-sender) ERR-NOT-SUBSCRIBED)))
    (asserts! (is-eq (get tier sub) TIER-PRO) ERR-NOT-SUBSCRIBED)
    (let (
      (billing-cycle (get billing-cycle sub))
      (price         (price-for billing-cycle))
      (duration      (duration-for billing-cycle))
      ;; Stack onto current expiry if still active, otherwise from now
      (base          (if (> (get expires-at sub) block-height)
                       (get expires-at sub)
                       block-height))
      (new-expires   (+ base duration))
    )
      (try! (stx-transfer? price tx-sender (as-contract tx-sender)))
      (var-set revenue-ustx (+ (var-get revenue-ustx) price))
      (map-set subscriptions tx-sender
        (merge sub { expires-at: new-expires })
      )
      (ok new-expires)
    )
  )
)

;; Cancel auto-renewal (subscription remains active until expiry).
(define-public (cancel-auto-renew)
  (let ((sub (unwrap! (map-get? subscriptions tx-sender) ERR-NOT-SUBSCRIBED)))
    (map-set subscriptions tx-sender (merge sub { auto-renew: false }))
    (ok true)
  )
)

;; Downgrade to free tier (only after pro subscription has expired).
(define-public (downgrade-to-free)
  (let ((sub (unwrap! (map-get? subscriptions tx-sender) ERR-NOT-SUBSCRIBED)))
    (asserts! (not (subscription-active? sub)) ERR-SUB-STILL-ACTIVE)
    (map-set subscriptions tx-sender
      (merge sub { tier: TIER-FREE, expires-at: u0 })
    )
    (ok true)
  )
)

;; ─── Admin Functions ──────────────────────────────────────────────────────────

;; Grant enterprise tier to a principal (no payment — billed off-chain).
(define-public (grant-enterprise (grantee principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (map-set subscriptions grantee
      {
        tier:          TIER-ENTERPRISE,
        billing-cycle: CYCLE-MONTHLY,   ;; not used for enterprise
        started-at:    block-height,
        expires-at:    u0,              ;; never expires
        auto-renew:    false,
      }
    )
    (ok true)
  )
)

;; Revoke enterprise tier.
(define-public (revoke-enterprise (grantee principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((sub (unwrap! (map-get? subscriptions grantee) ERR-NOT-SUBSCRIBED)))
      (asserts! (is-eq (get tier sub) TIER-ENTERPRISE) ERR-INVALID-TIER)
      (map-set subscriptions grantee
        (merge sub { tier: TIER-FREE, expires-at: u0 })
      )
      (ok true)
    )
  )
)

;; Withdraw accumulated revenue to the treasury address.
(define-public (withdraw-revenue)
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((amount (var-get revenue-ustx)))
      (try! (as-contract (stx-transfer? amount tx-sender (var-get treasury-address))))
      (var-set revenue-ustx u0)
      (ok amount)
    )
  )
)

;; Update the treasury address.
(define-public (set-treasury (new-treasury principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (var-set treasury-address new-treasury)
    (ok true)
  )
)

;; ─── Read-Only Functions ──────────────────────────────────────────────────────

(define-read-only (get-subscription (user principal))
  (map-get? subscriptions user)
)

(define-read-only (is-pro (user principal))
  (match (map-get? subscriptions user)
    sub (and
          (is-eq (get tier sub) TIER-PRO)
          (> (get expires-at sub) block-height)
        )
    false
  )
)

(define-read-only (is-enterprise (user principal))
  (match (map-get? subscriptions user)
    sub (is-eq (get tier sub) TIER-ENTERPRISE)
    false
  )
)

(define-read-only (has-active-subscription (user principal))
  (match (map-get? subscriptions user)
    sub (subscription-active? sub)
    false
  )
)

(define-read-only (get-pro-price (billing-cycle uint))
  (price-for billing-cycle)
)

(define-read-only (get-revenue)
  (var-get revenue-ustx)
)

(define-read-only (get-treasury)
  (var-get treasury-address)
)
