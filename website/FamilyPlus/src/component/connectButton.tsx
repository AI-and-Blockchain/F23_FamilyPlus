import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box>
      <Text color="white" fontSize="md">
        // etherBalance will be an object, so we stringify it 
        {etherBalance && JSON.stringify(etherBalance)} ETH
      </Text>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}
            fontWeight="bold"
            py="4" // Increase the vertical padding
            px="8" // Increase the horizontal padding
            rounded="lg"
            fontSize="xl" // Increase the font size
            _hover={{   bgGradient: "linear(to-r, purple.400, blue.500)",
            color: "white",}}
    >
      Connect to your metamask wallet
    </Button>
  );
}