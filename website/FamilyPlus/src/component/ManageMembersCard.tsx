// components/ManageMembersCard.tsx
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ManageMembersCardProps {
  to: string;
}

const ManageMembersCard: React.FC<ManageMembersCardProps> = ({ to }) => {
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
        style={{ fontFamily: "Georgia, sans-serif" }} // Set the desired font family
        _hover={{
            bg: "orange.100", // Change background color on hover
          }}
      >
        <Box p="6">
          <Text fontWeight="bold">Manage Members</Text>
          {/* Add any other content for the card */}
        </Box>
      </Box>
    </Link>
  );
};

export default ManageMembersCard;
