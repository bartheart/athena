import React from 'react';
import { Box, VStack, Image, Text } from '@chakra-ui/react';

function FolderIcons() {
  return (
    <Box textAlign="center">
      <Text fontSize="lg" fontWeight="bold">Student Submissions</Text>
      <VStack spacing={4}>
        {[25, 50, 75, 100].map((similarity, index) => (
          <Box key={index} bg="gray.100" p={4} borderRadius="md">
            <Image src="/file.png" alt="Dummy Image" />
            <Text>{`${similarity - 25}-${similarity}% Similarity`}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default FolderIcons;
