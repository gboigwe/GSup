import React, { useState } from 'react';
import { addUserToRole } from '../utils/contractInteractions';
import { ROLES } from '../utils/constants';

function AddUserToRole() {
  const [role, setRole] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUserToRole(parseInt(role), userAddress);
      setRole('');
      setUserAddress('');
      alert('User added to role successfully!');
    } catch (error) {
      console.error('Error adding user to role:', error);
      alert('Failed to add user to role. See console for details.');
    }
  };

  return (
    <div>
      <h2>Add User to Role</h2>
      <form onSubmit={handleSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          {Object.entries(ROLES).map(([key, value]) => (
            <option key={key} value={value}>{key}</option>
          ))}
        </select>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="User Address"
          required
        />
        <button type="submit">Add User to Role</button>
      </form>
    </div>
  );
}

export default AddUserToRole;
