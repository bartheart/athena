import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App'
import { AuthProvider } from '@context/UserAuthContext'
import { BrowserRouter as Router } from 'react-router-dom';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </ChakraProvider>
    </Router>
  </React.StrictMode>,
)
