;; buildr-registry.clar
;; Builder registration and profile management for the Buildr platform.
;; Builders link their Stacks wallet address to a GitHub handle and can be
;; verified by the contract owner (admin).

;; ─── Constants ────────────────────────────────────────────────────────────────

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED        (err u100))
(define-constant ERR-ALREADY-REGISTERED   (err u101))
(define-constant ERR-NOT-REGISTERED       (err u102))
(define-constant ERR-INVALID-HANDLE       (err u103))
(define-constant ERR-HANDLE-TAKEN         (err u104))
(define-constant ERR-ALREADY-VERIFIED     (err u105))

;; Maximum length of a GitHub handle (39 characters per GitHub rules)
(define-constant MAX-HANDLE-LEN u39)

;; ─── Data Maps & Vars ─────────────────────────────────────────────────────────

;; Primary builder profile keyed by wallet principal
(define-map builders
  principal
  {
    github-handle:    (string-ascii 39),
    display-name:     (string-utf8 64),
    bio:              (string-utf8 256),
    joined-at:        uint,      ;; block height
    is-verified:      bool,
    is-active:        bool,
  }
)

;; Reverse index: github-handle → principal (enforces uniqueness)
(define-map handle-to-principal
  (string-ascii 39)
  principal
)

;; Total registered builders
(define-data-var total-builders uint u0)

;; ─── Private Helpers ──────────────────────────────────────────────────────────

(define-private (is-owner)
  (is-eq tx-sender CONTRACT-OWNER)
)

(define-private (handle-valid? (handle (string-ascii 39)))
  (let ((len (len handle)))
    (and (> len u0) (<= len MAX-HANDLE-LEN))
  )
)

;; ─── Public Functions ─────────────────────────────────────────────────────────

;; Register a new builder profile.
;; Each principal may only register once; each GitHub handle must be unique.
(define-public (register
    (github-handle (string-ascii 39))
    (display-name  (string-utf8 64))
    (bio           (string-utf8 256))
  )
  (begin
    (asserts! (handle-valid? github-handle) ERR-INVALID-HANDLE)
    (asserts! (is-none (map-get? builders tx-sender)) ERR-ALREADY-REGISTERED)
    (asserts! (is-none (map-get? handle-to-principal github-handle)) ERR-HANDLE-TAKEN)

    (map-set builders tx-sender
      {
        github-handle: github-handle,
        display-name:  display-name,
        bio:           bio,
        joined-at:     block-height,
        is-verified:   false,
        is-active:     true,
      }
    )
    (map-set handle-to-principal github-handle tx-sender)
    (var-set total-builders (+ (var-get total-builders) u1))
    (ok true)
  )
)

;; Update mutable profile fields (display-name and bio only).
(define-public (update-profile
    (display-name (string-utf8 64))
    (bio          (string-utf8 256))
  )
  (let ((profile (unwrap! (map-get? builders tx-sender) ERR-NOT-REGISTERED)))
    (map-set builders tx-sender
      (merge profile { display-name: display-name, bio: bio })
    )
    (ok true)
  )
)

;; Deactivate own account.
(define-public (deactivate)
  (let ((profile (unwrap! (map-get? builders tx-sender) ERR-NOT-REGISTERED)))
    (map-set builders tx-sender (merge profile { is-active: false }))
    (ok true)
  )
)

;; ─── Admin Functions ──────────────────────────────────────────────────────────

;; Grant verified status to a builder.
(define-public (verify-builder (builder principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((profile (unwrap! (map-get? builders builder) ERR-NOT-REGISTERED)))
      (asserts! (not (get is-verified profile)) ERR-ALREADY-VERIFIED)
      (map-set builders builder (merge profile { is-verified: true }))
      (ok true)
    )
  )
)

;; Revoke verified status.
(define-public (unverify-builder (builder principal))
  (begin
    (asserts! (is-owner) ERR-NOT-AUTHORIZED)
    (let ((profile (unwrap! (map-get? builders builder) ERR-NOT-REGISTERED)))
      (map-set builders builder (merge profile { is-verified: false }))
      (ok true)
    )
  )
)

;; ─── Read-Only Functions ──────────────────────────────────────────────────────

(define-read-only (get-builder (builder principal))
  (map-get? builders builder)
)

(define-read-only (get-builder-by-handle (handle (string-ascii 39)))
  (match (map-get? handle-to-principal handle)
    principal-val (map-get? builders principal-val)
    none
  )
)

(define-read-only (is-registered (builder principal))
  (is-some (map-get? builders builder))
)

(define-read-only (is-verified (builder principal))
  (match (map-get? builders builder)
    profile (get is-verified profile)
    false
  )
)

(define-read-only (get-total-builders)
  (var-get total-builders)
)
