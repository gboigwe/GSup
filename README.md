# Supply Chain Management Smart Contract

## Overview
This smart contract is designed to manage the lifecycle and authenticity of products in a supply chain. It provides the following key functionalities:

1. **Product Lifecycle Tracking**: The contract tracks the current stage of a product in the supply chain, as well as the timestamps for each stage (origin, manufacturing, distribution, retail, and consumer).

2. **Product Authenticity Data**: The contract stores authenticity information for each product, including details about the origin, manufacturing, distribution, and retail stages.

3. **Product Addition and Stage Updates**: The contract allows for the addition of new products to the supply chain and the updating of the current stage of a product as it progresses through the supply chain.

4. **Product Authenticity Updates**: The contract allows for the updating of authenticity information for a product at each stage of the supply chain.

5. **Product Information Retrieval**: The contract provides a read-only function to retrieve the current stage and authenticity information for a given product.

## Smart Contract Functions

1. **`add-product`**:
  - **Parameters**: `(product-id uint)`
  - **Description**: Adds a new product to the supply chain with the specified `product-id`. Initializes the product's lifecycle data and authenticity information.
  - **Emits**: `(product-added product-id)` event.

2. **`update-product-stage`**:
  - **Parameters**: `(product-id uint) (new-stage uint)`
  - **Description**: Updates the current stage of the product with the specified `product-id` to the `new-stage`. Validates that the new stage is valid and greater than the current stage.
  - **Emits**: `(product-stage-updated product-id new-stage)` event.

3. **`update-product-authenticity`**:
  - **Parameters**: `(product-id uint) (origin-info (optional (buff 256))) (manufacturing-info (optional (buff 256))) (distribution-info (optional (buff 256))) (retail-info (optional (buff 256)))`
  - **Description**: Updates the authenticity information for the product with the specified `product-id`.
  - **Emits**: `(product-authenticity-updated product-id)` event.

4. **`get-product-info`**:
  - **Parameters**: `(product-id uint)`
  - **Description**: Retrieves the current stage and authenticity information for the product with the specified `product-id`.
  - **Returns**: A list containing the current stage, origin information, manufacturing information, distribution information, and retail information for the product.

## Product Lifecycle Stages
The contract defines the following constants for the product lifecycle stages:

- `ORIGIN`: 0
- `MANUFACTURING`: 1
- `DISTRIBUTION`: 2
- `RETAIL`: 3
- `CONSUMER`: 4

## Events
The contract defines the following events:

- `(product-added product-id)`: Emitted when a new product is added to the supply chain.
- `(product-stage-updated product-id stage)`: Emitted when the current stage of a product is updated.
- `(product-authenticity-updated product-id)`: Emitted when the authenticity information for a product is updated.

## Data Structures
The contract uses the following data structures:

1. **`product-lifecycle`**: A map that stores the current stage and timestamp information for each product in the supply chain.
2. **`product-authenticity`**: A map that stores the authenticity information for each product in the supply chain.

## Usage
To use this smart contract, you can interact with the various functions to manage the lifecycle and authenticity of products in your supply chain. For example, you can add a new product, update the current stage of a product, update the authenticity information for a product, and retrieve the current stage and authenticity information for a product.
