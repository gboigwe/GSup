import React, { useState } from 'react';
import { updateProductStage } from '../../utils/contractInteractions';
import { STAGES } from '../../utils/constants';
import styles from './UpdateProductStage.module.css';

function UpdateProductStage() {
  const [productId, setProductId] = useState('');
  const [stage, setStage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductStage(parseInt(productId), parseInt(stage));
      setProductId('');
      setStage('');
      alert('Product stage updated successfully!');
    } catch (error) {
      console.error('Error updating product stage:', error);
      alert('Failed to update product stage. See console for details.');
    }
  };

  return (
    <div className={styles.updateStageContainer}>
      <h2 className={styles.title}>Update Product Stage</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="productId" className={styles.label}>Product ID</label>
          <input
            id="productId"
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="stage" className={styles.label}>Stage</label>
          <select 
            id="stage"
            value={stage} 
            onChange={(e) => setStage(e.target.value)} 
            className={styles.select}
            required
          >
            <option value="">Select Stage</option>
            {Object.entries(STAGES).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Update Stage</button>
      </form>
    </div>
  );
}

export default UpdateProductStage;
