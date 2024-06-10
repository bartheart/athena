import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <Box bg="white" width="100%" p={4} color="black" boxShadow="sm">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading size="lg">
          <Link to="/">ATHENA ai</Link>
        </Heading>

      </Flex>
    </Box>
  );
};

export default Header;
