import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box 
        minH="100vh" 
        bgGradient="white" 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        flexDir="column">
      {children}
    </Box>
  );
}
