import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      bg="gray.200"  // Change background color to gray
      color="black"
      textAlign="center"
      position="fixed"  // Fix the position
      bottom="0"  // Keep it at the bottom
      width="100%"  // Set width to 100% to cover the entire width of the page
    >
      <Box mx="auto" p={2}>
        <p>© {new Date().getFullYear()} FamilyPlus@RPI All rights reserved.</p>
      </Box>
    </Box>
  );
};

export default Footer;
