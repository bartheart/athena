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
import Courses from '@views/Courses/Courses';
import  CourseDetails from '@views/Courses/CourseDetails';


const coursesData = [
  { id: 1, code: "CSCE 2100", name: "Intro to Computer Science" },
  { id: 2, code: "CSCE 5250", name: "Natural Lang Processing" },
  { id: 3, code: "CSCE 4600", name: "Systems Programming" },
  { id: 4, code: "MATH 2400", name: "Linear Algebra" }
];


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
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Courses courses={coursesData} />
              </MainLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CourseDetails courses={coursesData} />
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
