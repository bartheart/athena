import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from '@views/Dashboard/Dashboard';
import Grading from '@views/Grading/Grading';
import Login from '@views/Auth/Login';
import Registration from '@views/Auth/Registration';
import ForgotPassword from '@views/Auth/ForgotPassword';
import SetPassword from '@views/Auth/SetPassword';
import ProtectedRoute from '@components/ProtectedRoute';
import Header from '@components/Header';
import MainLayout from '@components/MainLayout';
import VerifyEmail from '@views/Auth/VerifyEmail';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route
          path="/"
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
        {/* Redirect to dashboard if route doesn't exist */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
