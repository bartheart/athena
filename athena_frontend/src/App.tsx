import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from '@views/Dashboard/Dashboard';
import Grading from '@views/Grading/Grading';
import Sidebar from '@components/Sidebar';
import Header from '@components/Header';

function App() {
  return (
    <Router>
      <Flex direction="column" height="100vh">
        <Header />
        <Flex flex="1">
          <Sidebar />
          <Box flex="1" p="5" overflow="auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/grading" element={<Grading />} />
              {/* Define other routes here */}
            </Routes>
          </Box>
        </Flex>
      </Flex>
    </Router>
  );
}

export default App;
