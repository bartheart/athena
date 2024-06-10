import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@context/UserAuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading,    Image, useToast } from "@chakra-ui/react";
import sideImage from "@assets/reg.webp"; // Import the image

const SetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmEmailAndSetPassword } = useAuth()!;
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const oobCode = searchParams.get("oobCode");
    if (oobCode) {
      try {
        await confirmEmailAndSetPassword(oobCode, newPassword);
        navigate("/login");
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while setting your password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid or missing oobCode.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" minH="100vh">
      <Box flex="1" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
        <Image src={sideImage} alt="Side image" boxSize="lg" objectFit="cover" />
      </Box>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="md" mx="auto" p={6} borderWidth={1} borderRadius="lg">
          <Heading mb={6}>Set Password</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="new-password" mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="confirm-password" mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Set Password</Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SetPassword;
