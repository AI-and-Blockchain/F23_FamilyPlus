import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Textarea } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting contact form:', name, email, message);

    // Replace the endpoint URL with the actual API endpoint for submitting the contact form

    console.log('Contact form submitted successfully');
    setName('');
    setEmail('');
    setMessage('');

    // Redirect or display a success message here
    // display a success message here
    alert('Contact form submitted successfully and redirecting to home page');
    navigate('/');
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-r, purple.400, pink.500, red.500)" display="flex" alignItems="center" justifyContent="center">
      <Box border="1px" rounded="lg" shadow="lg" p={8} bg="white" w="full" maxW="md">
        <Heading fontSize="3xl" fontWeight="bold" mb={6} color="gray.800">
          Contact Us
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <Box mb={5}>
            <label className="text-gray-700 font-bold text-xl">Name:</label>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              border="1px"
              rounded="lg"
              px={3}
              py={2}
              w="full"
              required
            />
          </Box>
          <Box mb={5}>
            <label className="text-gray-700 font-bold text-xl">Email:</label>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              border="1px"
              rounded="lg"
              px={3}
              py={2}
              w="full"
              required
            />
          </Box>
          <Box mb={5}>
            <label className="text-gray-700 font-bold text-xl">Message:</label>
            <Textarea
              value={message}
              onChange={handleMessageChange}
              border="1px"
              rounded="lg"
              px={3}
              py={2}
              w="full"
              rows={5}
              required
            />
          </Box>
          <Button
            type="submit"
            bgGradient="linear(to-r, blue.400, purple.600)"
            color="white"
            fontWeight="bold"
            py={2}
            rounded="lg"
            fontSize="xl"
            _hover={{ bg: 'purple.500' }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactUs;
