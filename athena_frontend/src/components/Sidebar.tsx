import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, Text } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <VStack
      as="nav"
      spacing={4}
      mt="70px"
      align="stretch"
      bg="gray.50"
      p={5}
      borderRight="1px"
      borderColor="gray.200"
      width="250px"
      height="100vh"
    >
      <Link to="/">
        <Text>Dashboard</Text>
      </Link>
      <Link to="/grading">
        <Text>Grading</Text>
      </Link>
      <Link to="/courses">
        <Text>Courses</Text>
      </Link>
      <Link to="/messages">
        <Text>Messages</Text>
      </Link>
      <Link to="/appeals">
        <Text>Appeals</Text>
      </Link>
      <Link to="/tools">
        <Text>Tools</Text>
      </Link>
      <Link to="/help">
        <Text>Help</Text>
      </Link>
      <Link to="/comments">
        <Text>Comments</Text>
      </Link>
      <Link to="/analytics">
        <Text>Analytics</Text>
      </Link>
      <Link to="/settings">
        <Text>Settings</Text>
      </Link>
    </VStack>
  );
};

export default Sidebar;
