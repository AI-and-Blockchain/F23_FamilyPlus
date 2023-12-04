import { Link } from 'react-router-dom';
import { Flex, Box, Image, Link as ChakraLink } from '@chakra-ui/react';
import Logo from '../image/logo-2.png';

export default function Headers() {
  return (
    <Flex bg="white.200" p={2} align="center" justify="space-between">
      <Box>
        <Link to="/">
          <Image src={Logo} alt="Logo" w="100" h="100" />
        </Link>
      </Box>
      <Box ml="auto"> {/* Add ml="auto" to align items to the right */}
        <Flex>
          <ChakraLink
            as={Link}
            to="/connect"
            fontWeight="bold"
            fontSize="30px" 
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: 'orange.100', transition: 'color 0.3s' }}
          >
            Login
          </ChakraLink>
        </Flex>
      </Box>
      <Box ml="4"> {/* Add ml="4" for some spacing between "Login" and "Contact Us" */}
        <Flex>
          <ChakraLink
            as={Link}
            to="/contact-us"
            fontWeight="bold"
            fontSize="30px" 
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: 'orange.100', transition: 'color 0.3s' }}
          >
            Contact Us
          </ChakraLink>
        </Flex>
      </Box>
    </Flex>
  );
}
