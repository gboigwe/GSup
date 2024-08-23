import React, { useState } from 'react';
import { addProduct } from '../utils/contractInteractions';
import styles from './AddProduct.module.css';
import '../styles/common.css';

function AddProduct() {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(parseInt(productId));
      setProductId('');
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. See console for details.');
    }
  };

  return (
    <div className={`${styles.formContainer} card`}>
      <h2 className={styles.title}>Add Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
          className={`${styles.input} form-control`}
        />
        <button type="submit" className={`${styles.submitButton} btn`}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
