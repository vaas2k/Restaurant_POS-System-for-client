'use client'
import React, { useEffect,useState } from 'react';
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Navbar = () => {

  const router = useRouter();
  const [ user , setUser ] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : false;
    const name = typeof window !== "undefined" ? window.localStorage.getItem('user_name') : false;
    if(token){
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.role === 'admin');
      setUser(name);
    }
  },[]);

  const handleSignOut = () => {
    typeof window !== undefined ? localStorage.removeItem('token') : null;
    router.push('/sign-in');
    setTimeout(()=>{typeof window !== undefined ? window.location.reload() : null ;},2000)
  };

  const authRender = () => {

    if(user){
      return(
        <Button color={'error'} onClick={handleSignOut} >Sign Out</Button>
      )
    }
    else{
      return(
        <>
        <Link href="/sign-in" className="hover:text-gray-400">
            <Button>SignIn</Button>
          </Link>
          <Link href="/sign-up" className="hover:text-gray-400">
          <Button  >SignUp</Button>
        </Link>
        </>
      )
    }
  }

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Kazim K-POP</Link>

      <Button> Logged in &nbsp;<b style={{color:'whitesmoke'}}> {user} </b></Button>

      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-400">
          <Button >Home</Button>
          </Link>
        </li>
        <li>
          <Link href="/menu" className="hover:text-gray-400">
          <Button>Menu</Button>
          </Link>
        </li>

        {isAdmin && <li>
          <Link href="/order-history" className="hover:text-gray-400">
          <Button>Orders</Button> 
          </Link>
        </li>}
        
        {isAdmin && <li>
          <Link href="/add-items" className="hover:text-gray-400">
          <Button >Add items</Button>
          </Link>
        </li>}

        {authRender()}

      </ul>
    </nav>
  );
};

export default Navbar;
