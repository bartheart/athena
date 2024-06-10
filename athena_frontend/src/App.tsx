import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from '@views/Dashboard/Dashboard';
import Grading from '@views/Grading/Grading';
import Login from '@views/Login/Login';
import Registration from '@views/Registration/Registration';
import ForgotPassword from '@views/ForgotPassword/ForgotPassword';
import SetPassword from '@views/SetPassword/SetPassword';
import ProtectedRoute from '@components/ProtectedRoute';
import Header from '@components/Header';
import MainLayout from '@components/MainLayout';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grading"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Grading />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* Define other routes here */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
