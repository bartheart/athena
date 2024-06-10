import React, { useState } from "react";
import { useAuth } from "@context/UserAuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading, Image, useToast, Flex } from "@chakra-ui/react";
import sideImage from "@assets/reg.webp"; // Import the image
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithEmail } = useAuth()!; // Use the context
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, fullName, password);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your account.",
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
          <Heading mb={8}>Create your Athena account</Heading>
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
            <FormControl id="first-name" mb={4}>
              <FormLabel>Full name</FormLabel>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Create account</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Registration;
