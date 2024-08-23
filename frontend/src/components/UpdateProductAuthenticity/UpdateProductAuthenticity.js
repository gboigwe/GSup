import React, { useState } from 'react';
import { updateProductAuthenticity } from '../utils/contractInteractions';

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
    <div>
      <h2>Update Product Authenticity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <input
          type="text"
          value={originInfo}
          onChange={(e) => setOriginInfo(e.target.value)}
          placeholder="Origin Info"
        />
        <input
          type="text"
          value={manufacturingInfo}
          onChange={(e) => setManufacturingInfo(e.target.value)}
          placeholder="Manufacturing Info"
        />
        <input
          type="text"
          value={distributionInfo}
          onChange={(e) => setDistributionInfo(e.target.value)}
          placeholder="Distribution Info"
        />
        <input
          type="text"
          value={retailInfo}
          onChange={(e) => setRetailInfo(e.target.value)}
          placeholder="Retail Info"
        />
        <button type="submit">Update Authenticity</button>
      </form>
    </div>
  );
}

export default UpdateProductAuthenticity;
