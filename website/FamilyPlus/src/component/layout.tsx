import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box minH="100vh" bgGradient="linear(to-r, orange.300, yellow.300, red.200)" display="flex" alignItems="center" justifyContent="center" flexDir="column">
      {children}
    </Box>
  );
}
