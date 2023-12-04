import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Build an interface for the component props
interface AskChatbotCardProps {
  to: string;
}

// Build a card component
const AskChatbotCard: React.FC<AskChatbotCardProps> = ({ to }) => {
  return (
    <Link to={to}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg="gray.100" // Set the default background color
        overflow="hidden"
        cursor="pointer"
        p="8"                  // Increase padding
        textAlign="center"    // Center text
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="50px"          // Increase font size
        style={{ fontFamily: "Georgia, sans-serif" }} // Set the desired font family
        _hover={{
            bg: "orange.100", // Change background color on hover
          }}
      >
        <Box p="6">
          <Text fontWeight="bold">Ask Chatbot</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default AskChatbotCard;
