// components/SignUp.js
import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Typography } from '@mui/material';

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUp(); // Call the onSignUp function passed as prop
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
      <Typography variant="h5" align="center">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;