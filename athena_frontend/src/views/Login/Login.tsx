import React, { useState } from "react";
import { useAuth } from "@context/UserAuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading, Link, Image, useToast, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import sideImage from "@assets/reg.webp"; // Import the image

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmailAndPasswordFunc } = useAuth()!;
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPasswordFunc(email, password);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please check your credentials.",
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
          <Heading mb={6}>Sign in to your account</Heading>
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
            <FormControl id="password" mb={4}>
              <FormLabel>
                Password
                <Link as={RouterLink} to="/forgot-password" ml={2} color="blue.500">
                  Forgot Password?
                </Link>
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Sign In</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
