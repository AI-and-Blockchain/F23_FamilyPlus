// components/UploadDocumentsCard.tsx
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface UploadDocumentsCardProps {
  to: string;
}

const UploadDocumentsCard: React.FC<UploadDocumentsCardProps> = ({ to }) => {
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
        fontSize="50px"          // Increase font size
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
            bg: "orange.100", // Change background color on hover
          }}
        style={{ fontFamily: "Georgia, sans-serif" }} // Set the desired font family
      >
        <Box p="6">
          <Text fontWeight="bold">Upload Documents</Text>
          {/* Add any other content for the card */}
        </Box>
      </Box>
    </Link>
  );
};

export default UploadDocumentsCard;
