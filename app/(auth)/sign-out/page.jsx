'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = () => {
    typeof window !== undefined ? localStorage.removeItem('token') : null;
    router.push('/sign-in');
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;