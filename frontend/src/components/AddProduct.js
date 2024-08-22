import React, { useState } from 'react';
import { addProduct } from '../utils/contractInteractions';

function AddProduct() {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(parseInt(productId));
      setProductId('');
      alert('Product was added successfully!');
    } catch (error) {
      console.error('Error in adding product:', error);
      alert('Failed to add a product.');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
