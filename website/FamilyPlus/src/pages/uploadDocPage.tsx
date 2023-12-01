// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import EthereumProvider from 'web3-eth';
import { Buffer } from 'buffer/';
import Headers from '../component/header';
import Footer from '../component/footer';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

// Import the encrypt_document function from crypto.ts
import { encrypt_document, encode_asymmetric_encrypted_data, EncryptedData } from '../../../../Crypto/crypto';
import { uploadFile, downloadFile, bufferToCID } from '../../../../Crypto/ipfs';
// Import contract ABI from the JSON file
import contractABI from '../assets/contract-ABI.json';
interface ExtendedWindow extends Window {
  ethereum?: EthereumProvider;
}

const UploadDocPage: React.FC = () => {
  const [fileContent, setFileContent] = useState('');
  const [encryptedDocument, setEncryptedDocument] = useState<string | null>(null);
  const navigate = useNavigate();

  // Connect to Ethereum provider (MetaMask or Infura)
  const web3 = new Web3((window as ExtendedWindow).ethereum);

  // Set the contract address
  const contractAddress = '0x539cc540df235b7d9b511cad4a214aeae445bf96';

  // Create contract instance using the ABI from the imported JSON file
  const myContract = new web3.eth.Contract(contractABI, contractAddress);

 // Function to handle document upload
const handleUpload = async () => {
    try {
      // Request account access from MetaMask
      const accounts = await (window as ExtendedWindow).ethereum.request({
        method: 'eth_requestAccounts',
      });
  
      if (accounts.length > 0) {
        const userAddress = accounts[0];
  
        // Get public key from MetaMask
        const publicKey: Buffer = Buffer.from(naclUtil.decodeBase64( await (window as ExtendedWindow).ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [userAddress],
        })));
  
        // Encrypt the document content
        const documentData = Buffer.from(fileContent);
        const encryptedData: EncryptedData = await encrypt_document(publicKey, documentData);
        const IPFS_hash = await uploadFile(encryptedData.encrypted_document)

        const encoded_input = encode_asymmetric_encrypted_data(encryptedData.encrypted_key, IPFS_hash)
  
        // Call the write function in your Ethereum contract
        await myContract.methods.write(bufferToCID(IPFS_hash).toString(), encoded_input).send({
          from: userAddress,
        });
        alert('Successfully upload the document and redirect to health-portal page');
        navigate('/health-portal');
        // Optionally, you can update state or show a success message
        //setEncryptedDocument(encryptedData);
      } else {
        console.error('No accounts available.');
        // Handle error state or show an error message
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      // Handle error state or show an error message
    }
  };
  

  return (
    <Box>
      <Headers />
      <Heading mb={4}>Upload Document</Heading>
      <textarea
        placeholder="Enter your document content here"
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        rows={8}
        cols={50}
      />
      <Button colorScheme="teal" onClick={handleUpload} mt={4}>
        Upload Document
      </Button>

      {encryptedDocument && (
        <Box mt={4}>
          <Text fontSize="xl">Encrypted Document:</Text>
          <Text>{encryptedDocument}</Text>
        </Box>
      )}
        <Footer />
    </Box>
  );
};

export default UploadDocPage;



