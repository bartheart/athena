import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="gray.50" p={5} borderBottom="1px" borderColor="gray.200" width="100%">
      <Heading as="h1" size="lg" color="gray.800">ATHENA ai</Heading>
    </Box>
  );
};

export default Header;
