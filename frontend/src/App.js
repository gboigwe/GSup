import React from 'react';
import { Connect } from '@stacks/connect-react';
import { StacksTestnet } from '@stacks/network';
import AddProduct from './components/AddProduct';
import './App.css';

function App() {
  const appDetails = {
    name: 'Supply Chain Management',
    icon: window.location.origin + '/logo512.png',
  };

  const network = new StacksTestnet();

  return (
    <Connect
      authOptions={{
        appDetails,
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession: userSession,
      }}
    >
      <div className="App">
        <h1>Supply Chain Management</h1>
        <AddProduct />
      </div>
    </Connect>
  );
}

export default App;
