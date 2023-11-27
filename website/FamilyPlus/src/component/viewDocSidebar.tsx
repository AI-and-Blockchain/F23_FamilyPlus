// FolderSidebar.tsx
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface FolderSidebarProps {
  folders: string[];
  onSelectFolder: (folder: string) => void;
}

const FolderSidebar: React.FC<FolderSidebarProps> = ({ folders, onSelectFolder }) => {
  return (
    <Box width="200px" p="4" bg="gray.200">
      <VStack align="start" spacing="4">
        {folders.map((folder) => (
          <Box key={folder} onClick={() => onSelectFolder(folder)} cursor="pointer">
            <Text fontWeight="bold">{folder}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default FolderSidebar;
