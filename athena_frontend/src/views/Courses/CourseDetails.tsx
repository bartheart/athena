import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import FileUpload from '@components/FileUpload';

interface Course {
  id: number;
  code: string;
  name: string;
}

interface CourseDetailsProps {
  courses: Course[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courses }) => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(course => course.id === parseInt(id!));

  if (!course) {
    return <Text>Course not found</Text>;
  }

  return (
    <Box p={5}>
      <Heading mb={5}>{course.code} - {course.name}</Heading>
      <FileUpload fileName='Key'/>
    </Box>
  );
};

export default CourseDetails;
