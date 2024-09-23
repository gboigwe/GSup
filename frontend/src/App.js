import React from 'react';
import { Connect } from '@stacks/connect-react';
import { UserSession, AppConfig } from '@stacks/connect';
// import { StacksTestnet } from '@stacks/network';
import AddProduct from './components/AddProduct/AddProduct';
import UpdateProductStage from './components/UpdateProductStage/UpdateProductStage';
import UpdateProductAuthenticity from './components/UpdateProductAuthenticity/UpdateProductAuthenticity';
import GetProductInfo from './components/GetProductInfo/GetProductInfo';
import AddUserToRole from './components/AddUserToRole/AddUserToRole';
import './styles/common.css';

function App() {
  const appConfig = new AppConfig(['store_write', 'publish_data']);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: 'Supply Chain Management',
    icon: window.location.origin + '/logo512.png',
  };

  // const network = new StacksTestnet();

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
        <UpdateProductStage />
        <UpdateProductAuthenticity />
        <GetProductInfo />
        <AddUserToRole />
      </div>
    </Connect>
  );
}

export default App;