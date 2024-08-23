import React, { useState } from 'react';
import { getProductInfo } from '../utils/contractInteractions';

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
    <div>
      <h2>Get Product Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <button type="submit">Get Info</button>
      </form>
      {productInfo && (
        <div>
          <h3>Product Information:</h3>
          <p>Current Stage: {productInfo.currentStage}</p>
          <p>Origin Info: {productInfo.originInfo || 'N/A'}</p>
          <p>Manufacturing Info: {productInfo.manufacturingInfo || 'N/A'}</p>
          <p>Distribution Info: {productInfo.distributionInfo || 'N/A'}</p>
          <p>Retail Info: {productInfo.retailInfo || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default GetProductInfo;
