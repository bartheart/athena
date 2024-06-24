import React from 'react';
import { Box, Flex, Heading, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  code: string;
  name: string;
}

interface CoursesProps {
  courses: Course[];
}

function Courses({ courses }: CoursesProps) {
  return (
    <Box p={5}>
      <Heading mb={5}>Courses</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {courses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`}>
            <GridItem w="100%" p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
              <Flex direction="column" align="center">
                <Icon as={FaFolder} boxSize={12} mb={3} color="blue.500" />
                <Text fontSize="lg" fontWeight="bold">{course.code}</Text>
                <Text fontSize="md">{course.name}</Text>
              </Flex>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
