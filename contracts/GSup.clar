;; title: Supply Chain Management Smart Contract
;; version: 1.0.0
;; summary: Supply Chain Management Smart Contract in Clarity
;; description: This smart contract is used to manage the supply chain of products. It allows for the addition of new products, updating the current stage of a product, and updating the authenticity information of a product. It also provides a view function to retrieve the current stage and authenticity information of a product.

;; Supply Chain Management Smart Contract in Clarity

;; Define contract owner
(define-data-var contract-owner principal tx-sender)

;; User Roles
(define-constant ROLE_MANUFACTURER u0)
(define-constant ROLE_DISTRIBUTOR u1)
(define-constant ROLE_RETAILER u2)
(define-constant ROLE_CONSUMER u3)

;; Role-User Mapping
(define-map role-users
  {role: uint}
  {users: (list 100 principal)})

;; Product Lifecycle Stages
(define-constant ORIGIN u0)
(define-constant MANUFACTURING u1)
(define-constant DISTRIBUTION u2)
(define-constant RETAIL u3)
(define-constant CONSUMER u4)

;; Product Lifecycle Data
(define-map product-lifecycle
  {product-id: uint}
  {current-stage: uint, timestamps: (list 10 uint)})

;; Product Authenticity Data
(define-map product-authenticity
  {product-id: uint}
  {origin-info: (optional (buff 256)),
   manufacturing-info: (optional (buff 256)),
   distribution-info: (optional (buff 256)),
   retail-info: (optional (buff 256))})

;; Log product-added event
(define-private (log-product-added (product-id uint))
  (print {event: "product-added", product-id: product-id}))

;; Log product-stage-updated event
(define-private (log-product-stage-updated (product-id uint) (stage uint))
  (print {event: "product-stage-updated", product-id: product-id, stage: stage}))

;; Log product-authenticity-updated event
(define-private (log-product-authenticity-updated (product-id uint))
  (print {event: "product-authenticity-updated", product-id: product-id}))

;; Check if the caller has the required role
(define-private (has-role (role uint))
  (match (map-get? role-users {role: role})
    role-data (is-some (index-of (get users role-data) tx-sender))
    false))

;; Add a new product to the supply chain
(define-public (add-product (product-id uint))
  (begin
    (asserts! (has-role ROLE_MANUFACTURER) (err "Unauthorized"))
    (map-set product-lifecycle
      {product-id: product-id}
      {current-stage: ORIGIN, 
       timestamps: (list 
         block-height
         block-height
         block-height
         u0 u0 u0 u0 u0 u0 u0)})
    (log-product-added product-id)
    (ok true)))

(define-public (update-product-stage (product-id uint) (stage uint))
  (begin
    (asserts! (has-role ROLE_DISTRIBUTOR) (err "Unauthorized"))
    (match (map-get? product-lifecycle {product-id: product-id})
      current-data (begin
        (map-set product-lifecycle
          {product-id: product-id}
          (merge current-data {current-stage: stage}))
        (log-product-stage-updated product-id stage)
        (ok true))
      (err "Product not found"))))

(define-public (update-product-authenticity (product-id uint) 
                                            (origin-info (optional (buff 256))) 
                                            (manufacturing-info (optional (buff 256))) 
                                            (distribution-info (optional (buff 256))) 
                                            (retail-info (optional (buff 256))))
  (begin
    (asserts! (has-role ROLE_RETAILER) (err "Unauthorized"))
    (map-set product-authenticity
      {product-id: product-id}
      {origin-info: origin-info, 
       manufacturing-info: manufacturing-info, 
       distribution-info: distribution-info, 
       retail-info: retail-info})
    (log-product-authenticity-updated product-id)
    (ok true)))

;; View the current stage and authenticity of a product
(define-read-only (get-product-info (product-id uint))
  (let ((product-lifecycle-data (map-get? product-lifecycle {product-id: product-id}))
        (product-authenticity-data (map-get? product-authenticity {product-id: product-id})))
    (if (and (is-some product-lifecycle-data) (is-some product-authenticity-data))
      (ok {
        current-stage: (get current-stage (unwrap-panic product-lifecycle-data)),
        origin-info: (get origin-info (unwrap-panic product-authenticity-data)),
        manufacturing-info: (get manufacturing-info (unwrap-panic product-authenticity-data)),
        distribution-info: (get distribution-info (unwrap-panic product-authenticity-data)),
        retail-info: (get retail-info (unwrap-panic product-authenticity-data))
      })
      (err "Product not found"))))

;; Add users to a specific role
(define-public (add-user-to-role (role uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err "Unauthorized: Only the contract owner can add users to roles"))
    (match (map-get? role-users {role: role})
      current-users (begin
        (map-set role-users 
          {role: role} 
          {users: (unwrap! (as-max-len? (append (get users current-users) user) u100) 
                           (err "Too many users for this role"))})
        (ok true))
      (err "Role not found"))))
