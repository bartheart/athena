import React from 'react';
import { Box, Heading, Text, Button, Image, Flex } from '@chakra-ui/react';
import sideImage from "@assets/reg.webp"; // Make sure this path is correct
import { EmailIcon } from '@chakra-ui/icons';


const VerifyEmail: React.FC = () => {

  const handleResendEmail = () => { 
    // Logic to resend verification email
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Image src={sideImage} alt="Side image" objectFit="cover" height="80%" width="100%" />
      </Box>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box width="100%" maxW="md" p={6} mx="auto" textAlign="center">
          <Box mb={6}>
            <Box bg="green.500" borderRadius="full" p={4} display="inline-block">
            <EmailIcon boxSize="50px" color="white" />
            </Box>
          </Box>
          <Heading mb={6}>Please verify your email</Heading>
          <Text mb={4}>We have sent a verification email to:</Text>
          <Text fontWeight="bold" mb={6}>your.email@example.com</Text>
          <Text mb={4}>Please check your email and follow the instructions to verify your account.</Text>
          <Button onClick={handleResendEmail} colorScheme="blue" mb={4}>Resend Verification Email</Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default VerifyEmail;
