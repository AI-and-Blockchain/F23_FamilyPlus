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
      py={4}
      px={8}
      rounded="lg"
      fontSize="xl"
      _hover={{ bg: 'purple.500' }}
    >
      Connect to your Metamask wallet
    </Button>
  );
}
