import React, { useState } from 'react';
import { addUserToRole } from '../../utils/contractInteractions';
import { ROLES } from '../../utils/constants';
import styles from './AddUserToRole.module.css';
import '../../styles/common.css';

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
    <div className={`${styles.roleContainer} card`}>
      <h2 className={styles.title}>Add User to Role</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.selectGroup}>
          <label htmlFor="role" className={styles.label}>Select Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className={`${styles.select} form-control`}
          >
            <option value="">Select Role</option>
            {Object.entries(ROLES).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="userAddress" className={styles.label}>User Address</label>
          <input
            id="userAddress"
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="User Address"
            required
            className={`${styles.input} form-control`}
          />
        </div>
        <button type="submit" className={`${styles.button} btn btn-primary`}>Add User to Role</button>
      </form>
    </div>
  );
}

export default AddUserToRole;
