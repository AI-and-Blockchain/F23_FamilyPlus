import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box bg="white" color="black" textAlign="center">
      <Box mx="auto" p={4}>
        <p>© {new Date().getFullYear()} FamilyPlus@RPI All rights reserved.</p>
      </Box>
    </Box>
  );
};

export default Footer;
