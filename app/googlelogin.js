// components/GoogleLogin.js
import React from 'react';
import { auth } from './firebase'; // Import the auth module
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import necessary functions
import { Button } from '@mui/material';

const GoogleLogin = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(); // Call the onLogin function passed as prop
    } catch (error) {
      console.error(error.message); // Handle errors here (e.g., show an alert)
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleLogin;