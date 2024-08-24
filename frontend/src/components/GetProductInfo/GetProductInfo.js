import React, { useState } from 'react';
import { getProductInfo } from '../../utils/contractInteractions';
import styles from './GetProductInfo.module.css';
import '../../styles/common.css';

function GetProductInfo() {
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = await getProductInfo(parseInt(productId));
      setProductInfo(info);
    } catch (error) {
      console.error('Error getting product info:', error);
      alert('Failed to get product info. See console for details.');
    }
  };

  return (
    <div className={`${styles.infoContainer} card`}>
      <h2 className={styles.title}>Get Product Info</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
          className={`${styles.input} form-control`}
        />
        <button type="submit" className={`${styles.button} btn btn-primary`}>Get Info</button>
      </form>
      {productInfo && (
        <div className={styles.productInfo}>
          <h3 className={styles.infoTitle}>Product Information:</h3>
          <p className={styles.infoItem}>
            <span className={styles.infoLabel}>Current Stage:</span>
            <span className={styles.infoValue}>{productInfo.currentStage}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.infoLabel}>Origin Info:</span>
            <span className={styles.infoValue}>{productInfo.originInfo || 'N/A'}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.infoLabel}>Manufacturing Info:</span>
            <span className={styles.infoValue}>{productInfo.manufacturingInfo || 'N/A'}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.infoLabel}>Distribution Info:</span>
            <span className={styles.infoValue}>{productInfo.distributionInfo || 'N/A'}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.infoLabel}>Retail Info:</span>
            <span className={styles.infoValue}>{productInfo.retailInfo || 'N/A'}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default GetProductInfo;
