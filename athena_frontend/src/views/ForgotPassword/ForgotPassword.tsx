import React, { useState } from "react";
import { useAuth } from "@context/UserAuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading, Image, useToast, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import sideImage from "@assets/reg.webp"; // Import the image

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth()!;
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast({
        title: "Success",
        description: "Password reset email sent. Please check your inbox.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" width="100vw">
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Image src={sideImage} alt="Side image" objectFit="cover" height="80%" width="100%" />
      </Box>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box width="100%" maxW="md" p={6} mx="auto" mt={-12}>
          <Heading mb={6}>Reset your password</Heading>
          <Text mb={4}>Enter your email address to receive a password reset link.</Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Send Reset Link</Button>
            <Button as={RouterLink} to="/" variant="link" colorScheme="blue" mt={4}>Back to Login</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
