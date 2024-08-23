import React, { useState } from 'react';
import { updateProductAuthenticity } from '../../utils/contractInteractions';
import styles from './UpdateProductAuthenticity.module.css';
import '../../styles/common.css';

function UpdateProductAuthenticity() {
  const [productId, setProductId] = useState('');
  const [originInfo, setOriginInfo] = useState('');
  const [manufacturingInfo, setManufacturingInfo] = useState('');
  const [distributionInfo, setDistributionInfo] = useState('');
  const [retailInfo, setRetailInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductAuthenticity(
        parseInt(productId),
        originInfo,
        manufacturingInfo,
        distributionInfo,
        retailInfo
      );
      setProductId('');
      setOriginInfo('');
      setManufacturingInfo('');
      setDistributionInfo('');
      setRetailInfo('');
      alert('Product authenticity updated successfully!');
    } catch (error) {
      console.error('Error updating product authenticity:', error);
      alert('Failed to update product authenticity. See console for details.');
    }
  };

  return (
    <div className={`${styles.formContainer} card`}>
      <h2 className={styles.title}>Update Product Authenticity</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="productId" className={styles.label}>Product ID</label>
          <input
            id="productId"
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={`${styles.input} form-control`}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="originInfo" className={styles.label}>Origin Info</label>
          <input
            id="originInfo"
            type="text"
            value={originInfo}
            onChange={(e) => setOriginInfo(e.target.value)}
            className={`${styles.input} form-control`}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="manufacturingInfo" className={styles.label}>Manufacturing Info</label>
          <input
            id="manufacturingInfo"
            type="text"
            value={manufacturingInfo}
            onChange={(e) => setManufacturingInfo(e.target.value)}
            className={`${styles.input} form-control`}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="distributionInfo" className={styles.label}>Distribution Info</label>
          <input
            id="distributionInfo"
            type="text"
            value={distributionInfo}
            onChange={(e) => setDistributionInfo(e.target.value)}
            className={`${styles.input} form-control`}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="retailInfo" className={styles.label}>Retail Info</label>
          <input
            id="retailInfo"
            type="text"
            value={retailInfo}
            onChange={(e) => setRetailInfo(e.target.value)}
            className={`${styles.input} form-control`}
          />
        </div>
        <button type="submit" className={`${styles.submitButton} btn btn-primary`}>Update Authenticity</button>
      </form>
    </div>
  );
}

export default UpdateProductAuthenticity;
