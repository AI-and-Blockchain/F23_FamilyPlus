import { Link } from 'react-router-dom';
import { Flex, Box, Image, Link as ChakraLink } from '@chakra-ui/react';
import Logo from '../image/logo.png';

export default function Headers() {
  return (
    <Flex bg="white" p={4} align="center" justify="space-between">
      <Box>
        <Link to="/">
          <Image src={Logo} alt="Logo" w="120" h="120" />
        </Link>
      </Box>
      <Box>
        <Flex>
          <ChakraLink
            as={Link}
            to="/connect"
            fontWeight="bold"
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: 'red.600', transition: 'color 0.3s' }}
          >
            Login
          </ChakraLink>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <ChakraLink
            as={Link}
            to="/contact-us"
            fontWeight="bold"
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: 'red.600', transition: 'color 0.3s' }}
          >
            Contact Us
          </ChakraLink>
        </Flex>
      </Box>
    </Flex>
  );
}
