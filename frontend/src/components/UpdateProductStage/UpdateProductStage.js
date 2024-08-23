import React, { useState } from 'react';
import { updateProductStage } from '../../utils/contractInteractions';
import { STAGES } from '../../utils/constants';
import './UpdateProductStage.css';

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
      alert('Failed to update product stage.');
    }
  };

  return (
    <div>
      <h2>Update Product Stage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <select value={stage} onChange={(e) => setStage(e.target.value)} required>
          <option value="">Select Stage</option>
          {Object.entries(STAGES).map(([key, value]) => (
            <option key={key} value={value}>{key}</option>
          ))}
        </select>
        <button type="submit">Update Stage</button>
      </form>
    </div>
  );
}

export default UpdateProductStage;
