import React, { useEffect } from 'react';
import { Box, Heading, Text, Button, Image, Flex, useToast } from '@chakra-ui/react';
import { useAuth } from "@context/UserAuthContext";
import { EmailIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import sideImage from "@assets/reg.webp";
import { User, getAuth, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const VerifyEmail: React.FC = () => {
  const { user } = useAuth()!;
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser: User | null) => {
      if (currentUser) {
        await currentUser.reload(); // Reload the user to get the latest emailVerified status
        if (currentUser.emailVerified) {
          navigate('/'); // Redirect to dashboard
          toast({
            title: "Email verified",
            description: "Your email has been verified successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, toast]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          navigate('/'); // Redirect to dashboard
          toast({
            title: "Email verified",
            description: "Your email has been verified successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [user, navigate, toast]);

  const handleResendEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        toast({
          title: "Verification email resent",
          description: "Please check your inbox for the verification email.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        const authError = error as FirebaseError;
        toast({
          title: "Error",
          description: `Error resending verification email: ${authError.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
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
          <Text fontWeight="bold" mb={6}>{user?.email}</Text>
          <Text mb={4}>Please check your email and follow the instructions to verify your account.</Text>
          <Button onClick={handleResendEmail} colorScheme="blue" mb={4}>Resend Verification Email</Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default VerifyEmail;
