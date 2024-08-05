// pages/_app.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './globals.css';
import Router from './router';

const App = () => {
  return (
    <Router>
      {/* Your app content here */}
    </Router>
  );
};

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    analytics;
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;