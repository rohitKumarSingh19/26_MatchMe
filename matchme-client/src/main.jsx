// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ChakraProvider } from '@chakra-ui/react';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import AuthProvider from './contexts/AuthContext';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ChakraProvider>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </BrowserRouter>
//     </ChakraProvider>
//   </React.StrictMode>
// );
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import theme from './theme'; // custom theme (next step)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

