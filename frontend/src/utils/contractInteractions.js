import { openContractCall } from '@stacks/connect';
import { 
  callReadOnlyFunction,
  uintCV,
  bufferCV,
  someCV,
  noneCV,
  // principalCV,
  standardPrincipalCV
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from './constants';

const network = new StacksTestnet();

export const addProduct = async (productId) => {
  const functionArgs = [uintCV(productId)];
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'add-product',
    functionArgs,
    network,
    onFinish: data => {
      console.log('Transaction ID:', data.txId);
    },
  };
  await openContractCall(options);
};

export const updateProductStage = async (productId, stage) => {
  const functionArgs = [uintCV(productId), uintCV(stage)];
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'update-product-stage',
    functionArgs,
    network,
    onFinish: data => {
      console.log('Transaction ID:', data.txId);
    },
  };
  await openContractCall(options);
};

export const updateProductAuthenticity = async (productId, originInfo, manufacturingInfo, distributionInfo, retailInfo) => {
  const functionArgs = [
    uintCV(productId),
    originInfo ? someCV(bufferCV(originInfo)) : noneCV(),
    manufacturingInfo ? someCV(bufferCV(manufacturingInfo)) : noneCV(),
    distributionInfo ? someCV(bufferCV(distributionInfo)) : noneCV(),
    retailInfo ? someCV(bufferCV(retailInfo)) : noneCV()
  ];
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'update-product-authenticity',
    functionArgs,
    network,
    onFinish: data => {
      console.log('Transaction ID:', data.txId);
    },
  };
  await openContractCall(options);
};

export const getProductInfo = async (productId) => {
  const functionArgs = [uintCV(productId)];
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-product-info',
    functionArgs,
    network,
  };
  const result = await callReadOnlyFunction(options);
  return result;
};

export const addUserToRole = async (role, userAddress) => {
  const functionArgs = [uintCV(role), standardPrincipalCV(userAddress)];
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'add-user-to-role',
    functionArgs,
    network,
    onFinish: data => {
      console.log('Transaction ID:', data.txId);
    },
  };
  await openContractCall(options);
};
