import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import AuthProvider from './Context/AuthContext.jsx'
import './index.css'
// Extend colors and fonts
const colors = {
  brand: '#663300',
  second: '#ffcc99'
 
};
const theme = extendTheme({ colors });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      
        <AuthProvider>
          <App />
        </AuthProvider>
     
    </ChakraProvider>
   
  </StrictMode>,
)
