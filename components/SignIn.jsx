'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, TextField, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

const SignInContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const SignInForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 2,
  maxWidth: 400,
  width: '100%',
}));

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const { token } = await response.json();
      typeof window !== undefined ? localStorage.setItem('token', token) : null;
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SignInContainer>
      <SignInForm>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;