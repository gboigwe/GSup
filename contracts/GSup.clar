;; title: Supply Chain Management Smart Contract
;; version: 1.0.0
;; summary: Supply Chain Management Smart Contract in Clarity
;; description: This smart contract is used to manage the supply chain of products. It allows for the addition of new products, updating the current stage of a product, and updating the authenticity information of a product. It also provides a view function to retrieve the current stage and authenticity information of a product.

;; Supply Chain Management Smart Contract in Clarity

(define-constant contract-owner 'SPCM-1234)

;; User Roles
(define-constant ROLE_MANUFACTURER 0)
(define-constant ROLE_DISTRIBUTOR 1)
(define-constant ROLE_RETAILER 2)
(define-constant ROLE_CONSUMER 3)

;; Role-User Mapping
(define-map role-users
  ((role uint))
  ((users (list 10 principal))))

;; Product Lifecycle Stages
(define-constant ORIGIN 0)
(define-constant MANUFACTURING 1)
(define-constant DISTRIBUTION 2)
(define-constant RETAIL 3)
(define-constant CONSUMER 4)

;; Product Lifecycle Data
(define-map product-lifecycle
  ((product-id int))
  ((current-stage int)
   (timestamps (list 5 int))))

;; Product Authenticity Data
(define-map product-authenticity
  ((product-id int))
  ((origin-info (optional (buff 256)))
   (manufacturing-info (optional (buff 256)))
   (distribution-info (optional (buff 256)))
   (retail-info (optional (buff 256)))))

;; Events
(define-event product-added (product-id uint))
(define-event product-stage-updated (product-id uint stage uint))
(define-event product-authenticity-updated (product-id uint))

;; Check if the caller has the required role
(define-private (has-role (role uint))
  (let ((users (map-get? role-users role)))
    (if (and users (member? tx-sender users))
      true
      false)))

;; Add a new product to the supply chain
(define-public (add-product (product-id uint))
  (if (has-role ROLE_MANUFACTURER)
    (begin
      (map-insert product-lifecycle product-id
        (list ORIGIN (list
          (get-block-height)
          (get-block-height)
          (get-block-height)
          (get-block-height)
          (get-block-height))))
      (map-insert product-authenticity product-id
        (list None None None None))
      (emit (product-added product-id))
      (ok true))
    (err "Unauthorized: Only manufacturers can add products")))

;; Update the current stage of a product in the supply chain
(define-public (update-product-stage (product-id uint) (new-stage uint))
  (let ((current-stage (get current-stage (map-get? product-lifecycle product-id))))
    (if (and (> new-stage current-stage) (<= new-stage CONSUMER))
      (if (cond
            ((= new-stage MANUFACTURING) (has-role ROLE_MANUFACTURER))
            ((= new-stage DISTRIBUTION) (has-role ROLE_DISTRIBUTOR))
            ((= new-stage RETAIL) (has-role ROLE_RETAILER))
            ((= new-stage CONSUMER) (has-role ROLE_CONSUMER))
            (true false))
        (begin
          (map-set product-lifecycle product-id
            (list new-stage
              (list-append (get timestamps (map-get? product-lifecycle product-id)) (get-block-height))))
          (emit (product-stage-updated product-id new-stage))
          (ok true))
        (err "Unauthorized: You do not have permission to update this stage"))
      (err "Invalid stage update"))))

;; Update the authenticity information for a product
(define-public (update-product-authenticity (product-id uint)
                                  (origin-info (optional (buff 256)))
                                  (manufacturing-info (optional (buff 256)))
                                  (distribution-info (optional (buff 256)))
                                  (retail-info (optional (buff 256))))
  (if (or (has-role ROLE_MANUFACTURER)
          (has-role ROLE_DISTRIBUTOR)
          (has-role ROLE_RETAILER))
    (begin
      (map-set product-authenticity product-id
        (list origin-info manufacturing-info distribution-info retail-info))
      (emit (product-authenticity-updated product-id))
      (ok true))
    (err "Unauthorized: Only authorized roles can update product authenticity")))

;; View the current stage and authenticity of a product
(define-read-only (get-product-info (product-id uint))
  (let ((product-lifecycle-data (map-get? product-lifecycle product-id))
        (product-authenticity-data (map-get? product-authenticity product-id)))
    (if (and product-lifecycle-data product-authenticity-data)
      (list
        (get current-stage product-lifecycle-data)
        (get origin-info product-authenticity-data)
        (get manufacturing-info product-authenticity-data)
        (get distribution-info product-authenticity-data)
        (get retail-info product-authenticity-data))
      (err "Product not found"))))

;; Add users to a specific role
(define-public (add-user-to-role (role uint) (user principal))
  (if (eq? tx-sender contract-owner)
    (begin
      (map-set role-users role (list-append (map-get? role-users role) user))
      (ok true))
    (err "Unauthorized: Only the contract owner can add users to roles")))
