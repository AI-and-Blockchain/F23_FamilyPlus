import { useEthers } from '@usedapp/core';
import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const navigate = useNavigate();

  async function handleConnectWallet() {
    await activateBrowserWallet();
    // Redirect to the health portal page after successful login
    navigate('/health-portal');
  }

  return account ? (
    <Flex
      bg="gray.100"
      p={4}
      rounded="lg"
      direction="column"
      align="center"
      justify="center"
    >
      <p className="text-white text-md mb-4">Logged in as {account}</p>
      {/* Already logged in, navigate the user to the health portal */}
      <Button
        onClick={() => navigate('/health-portal')}
        bgGradient="linear(to-r, purple.400, blue.500)"
        color="white"
        fontWeight="bold"
        py={20}
        px={40}
        rounded="lg"
        fontSize="40px"
        _hover={{ bg: 'purple.500', transition: 'color 0.3s', color: 'white' }}
      >
        Go to Health Portal
      </Button>
    </Flex>
  ) : (
    // Not logged in, show the connect button
    <Button
      onClick={handleConnectWallet}
      bgGradient="linear(to-r, purple.400, blue.500)"
      color="white"
      fontWeight="bold"
      py={20}
      px={40}
      rounded="lg"
      fontSize="40px"
      _hover={{ bg: 'purple.500', transition: 'color 0.3s', color: 'white' }}
    >
      Connect to your Metamask wallet
    </Button>
  );
}
