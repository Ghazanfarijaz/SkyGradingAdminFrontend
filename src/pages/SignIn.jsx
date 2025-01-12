import { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigate } from "react-router-dom";
import { useAuth } from './../authentication/authProvider'; // Adjust path to your AuthProvider
import { useLoginUserMutation } from "../api/apiSlice"; // Your API call hook

export const SignIn = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Use the login function from AuthProvider
  const [loginUser, { isLoading }] = useLoginUserMutation();  // API call hook to login the user

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Make the API call to authenticate the user
    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response) {
        login(response.token);  // Assuming response contains a token or user data
        navigate('/');  // Redirect to the homepage or dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}  // Disable the button if the request is loading
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
