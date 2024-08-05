// components/Login.js
import { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Call the onLogin function passed as prop
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <Typography variant="h5" align="center">Login</Typography>
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
        Login
      </Button>
    </form>
  );
};

export default Login;