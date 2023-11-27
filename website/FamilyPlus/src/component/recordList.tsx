// RecordList.tsx
import React from 'react';
import { VStack, Text, Divider, Box } from '@chakra-ui/react';

interface RecordListProps {
  records: { id: number; title: string; date: string }[];
  onSelectRecord: (record: { id: number; title: string; date: string }) => void;
}

const RecordList: React.FC<RecordListProps> = ({ records, onSelectRecord }) => {
  return (
    <VStack align="start" spacing="4">
      {records.map((record) => (
        <Box key={record.id} onClick={() => onSelectRecord(record)} cursor="pointer">
          <Text>{record.title}</Text>
          <Divider />
        </Box>
      ))}
    </VStack>
  );
};

export default RecordList;
