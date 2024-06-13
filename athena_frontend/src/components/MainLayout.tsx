import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const noSidebarPaths = ["/login", "/set-password", "/registration", "/forgot-password"];
  const showSidebar = !noSidebarPaths.includes(window.location.pathname);

  return (
    <Flex minH="100vh" overflow="hidden">
      {showSidebar && <Sidebar />}
      <Box flex="1" p="5" mt="70px" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
