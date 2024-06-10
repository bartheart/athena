import { useLocation } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const noSidebarPaths = ["/", "/set-password"];
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <Flex>
      {showSidebar && <Sidebar />}
      <Box flex="1" p="5">
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
