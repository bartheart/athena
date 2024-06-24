import React from 'react';
import { Box, Flex,  Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { FaFolder } from 'react-icons/fa';


interface CourseIn {
    id: number;
    code: string;
    name: string;
  }
  interface CoursesProps {
    courses: CourseIn[];
  }

function Course({courses}: CoursesProps) {
  return (
    <Box p={5}>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {courses.map(course => (
          <GridItem key={course.id} w="100%" p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Flex direction="column" align="center">
              <Icon as={FaFolder} boxSize={12} mb={3} color="blue.500" />
              <Text fontSize="lg" fontWeight="bold">{course.code}</Text>
              <Text fontSize="md">{course.name}</Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Course;
