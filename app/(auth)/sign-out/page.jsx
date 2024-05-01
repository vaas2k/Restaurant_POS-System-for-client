'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = () => {
    typeof window !== undefined ? localStorage.removeItem('token') : null;
    router.push('/sign-in');
    setTimeout(()=>{typeof window !== undefined ? window.location.reload() : null ;},2000)
  };

  return (
    <div className='flex items-center justify-center p-[100px]'>
    <Button variant="contained" color="primary"  onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default SignOut;