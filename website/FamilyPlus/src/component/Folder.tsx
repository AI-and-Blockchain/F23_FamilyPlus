// FolderList.tsx
import { Box, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import Sublist from './Sublist'; // Import the Sublist component

interface FolderListProps {
  folders: string[];
  records: string[][];
}

const FolderList: React.FC<FolderListProps> = ({ folders, records }) => {
  return (
    <List spacing={3}>
      {folders.map((folder, index) => (
        <ListItem key={folder}>
          <Text fontWeight="bold">{folder}</Text>
          {/* Render the Sublist component for each folder */}
          <Sublist records={records[index]} />
        </ListItem>
      ))}
    </List>
  );
};

export default FolderList;
