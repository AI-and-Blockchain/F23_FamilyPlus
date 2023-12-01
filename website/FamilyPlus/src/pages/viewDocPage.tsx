// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import Web3 from 'web3';
import EthereumProvider from 'web3-eth';
import Headers from '../component/header';
import Footer from '../component/footer';

// Import the decrypt_document functions from crypto.ts
import { decrypt_document } from '../../../../Crypto/crypto'; 

// Import contract ABI from the JSON file
import contractABI from '../assets/contract-ABI.json';

interface ExtendedWindow extends Window {
    ethereum?: {
      enable?: () => Promise<string[]>;
    };
  }



const ViewDocPage = () => {
    const [fileIds, setFileIds] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [decryptedText, setDecryptedText] = useState('');

    // Connect to Ethereum provider
    const web3 = new Web3((window as ExtendedWindow).ethereum);

    // Request account access if needed
    useEffect(() => {
        const requestAccount = async () => {
            try {
                await (window as ExtendedWindow).ethereum?.enable?.();
            } catch (error) {
                console.error('MetaMask account access denied:', error);
            }
        };
        requestAccount();
    }, []);

    // Set the contract address
    const contractAddress = '0x539cc540df235b7d9b511cad4a214aeae445bf96'; 

    // Create contract instance using the ABI from the imported JSON file
    const myContract = new web3.eth.Contract(contractABI, contractAddress);

    // Function to fetch file IDs from the contract
    const fetchFileIds = async () => {
        try {
            // Use the list function from your contract (assuming it returns an array of file IDs)
            const fetchedFileIds = await myContract.methods.list().call();
            console.log(fetchedFileIds);
            // Ensure that fetchedFileIds is an array before setting the state
            if (Array.isArray(fetchedFileIds)) {
                setFileIds(fetchedFileIds);
            } else {
                console.error('Invalid data format returned from list function.');
            }
        } catch (error) {
        console.error('Error fetching file IDs:', error);
        }
    };
  

    // call the read function in the smart contract
    const handleFileClick = async (fileId: string) => {
        try {
        // Use Web3.js or ethers.js to call the read function in your Ethereum contract
        const cypherTextHex = await myContract.methods.read(fileId).call();
        
        // Convert hex string to Buffer
        const cypherTextBuffer = Buffer.from(cypherTextHex.slice(2), 'hex');
    
        // Decrypt the data
        const decryptedData = decrypt_document(yourPrivateKey, cypherTextBuffer);
        setDecryptedText(decryptedData.toString());
        setSelectedFile(fileId);
        } catch (error) {
        console.error('Error decrypting data:', error);
        }
    };
  

    useEffect(() => {
        fetchFileIds();
    }, []);

  return (
    <Box>
        <Headers />
        <Box p={4}>
            <Text fontSize="xl" mb={4}>
                List of File IDs:
            </Text>
            <ul>
                {fileIds.map((fileId) => (
                    <li key={fileId}>
                    <Link onClick={() => handleFileClick(fileId)}>{fileId}</Link>
                    </li>
                ))}
            </ul>

            {selectedFile && (
                <Box mt={4}>
                    <Text fontSize="xl">Decrypted Text:</Text>
                    <Text>{decryptedText}</Text>
                </Box>
            )}
        </Box>
        <Footer />
    </Box>
  );
};

export default ViewDocPage;
