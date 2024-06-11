import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/UserAuthContext';

const Header = () => {
  const { user, signOut } = useAuth()!;
  const navigate = useNavigate();
 
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Box bg="white" width="100%" p={4} color="black" boxShadow="sm" position="fixed" top="0" zIndex="1000">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading size="lg">
          <Link to="/">ATHENA ai</Link>
        </Heading>
        {user &&
        <Button colorScheme="red" onClick={handleSignOut}>
          Sign Out
        </Button>
        }
      </Flex>
    </Box>
  );
};

export default Header;
