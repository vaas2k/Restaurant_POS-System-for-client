'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = () => {
    typeof window !== undefined ? localStorage.removeItem('token') : null;
    router.push('/sign-in');
    setTimeout(()=>{typeof window !== undefined ? window.location.reload() : null ;},1000)
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;