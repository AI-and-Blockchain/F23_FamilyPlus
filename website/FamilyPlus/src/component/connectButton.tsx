import { useEthers, useEtherBalance } from '@usedapp/core';
import { Box, Button } from '@chakra-ui/react';

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box bg="gray.800" p={4} rounded="lg">
      <p className="text-white text-md">
        {etherBalance && JSON.stringify(etherBalance)} ETH
      </p>
    </Box>
  ) : (
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
