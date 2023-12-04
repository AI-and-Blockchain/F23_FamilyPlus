// Sublist.tsx
import { Box, List, ListItem, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { decrypt_document } from './crypto'; // Import the decrypt_document function

interface SublistProps {
  records: string[];
  privateKey: string; // Private key for decryption
}

const Sublist: React.FC<SublistProps> = ({ records, privateKey }) => {
  const handleDecryptedDownload = (record: string, encryptedKey: string, encryptedDocument: string, iv: Buffer) => {
    try {
      // Decrypt the document
      const decryptedDocument = decrypt_document(privateKey, encryptedKey, encryptedDocument, iv);

      // Convert the decrypted document to a Blob
      const blob = new Blob([decryptedDocument], { type: 'application/octet-stream' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${record}.txt`; // Set the filename
      link.click();
    } catch (error) {
      console.error('Error decrypting or downloading the document:', error);
      // Handle error as needed
    }
  };

  return (
    <List ml={4} spacing={2}>
      {records.map((record) => (
        <ListItem key={record}>
          <Text>{record}</Text>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => handleDecryptedDownload(record, /* pass encryptedKey, encryptedDocument, and iv here */)}>
            Decrypted and Download
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Sublist;
