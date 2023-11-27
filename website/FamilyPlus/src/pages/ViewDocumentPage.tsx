// ViewDocumentPage.tsx
import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import FolderSidebar from '../component/viewDocSidebar';
import RecordList from '../component/recordList';
import PdfViewer from '../component/PdfViewer';
import Header from '../component/header';
import Footer from '../component/footer';
import Web3 from 'web3';
import { Document, Page } from 'react-pdf';

const folders = ['Ophthalmology', 'Pharmacy', 'Dentistry', 'Cardiology', 'Neurology'];

// Dummy contract address and ABI, replace with the actual contract details
const contractAddress = '0x1234567890abcdef1234567890abcdef12345678';
// const contractABI = []; // Replace with the actual ABI

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Use an appropriate provider

const ViewDocumentPage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<{ id: number; title: string; date: string; pdfData: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Initialize contract instance
    const initContract = async () => {
      try {
        const instance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(instance);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initContract();
  }, []);

  const handleFolderSelect = async (folder: string) => {
    setSelectedFolder(folder);
    setSelectedRecord(null);
    setLoading(true);

    try {
      // Replace with your actual contract method to get records
      const result = await contract.methods.getRecords(folder).call();

      const records = result.map((record, index) => ({
        id: index,
        title: record.title,
        date: record.date,
        pdfData: record.pdfData, // Assuming PDF data is stored in the smart contract
      }));

      setRecords(records);
    } catch (error) {
      console.error('Error fetching records from blockchain:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordSelect = (record: { id: number; title: string; date: string; pdfData: string }) => {
    setSelectedRecord(record);
  };

  return (
    <Flex>
      <Headers />
      <FolderSidebar folders={folders} onSelectFolder={handleFolderSelect} />
      <RecordList records={records} onSelectRecord={handleRecordSelect} />
      <PdfViewer pdfData={selectedRecord?.pdfData} />
      <Footer />
    </Flex>
  );
};

export default ViewDocumentPage;
