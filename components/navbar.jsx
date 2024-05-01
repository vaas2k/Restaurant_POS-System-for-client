'use client'
import React, { useEffect,useState } from 'react';
import Link from 'next/link'
import jwt from 'jsonwebtoken'

const Navbar = () => {

  const [ user , setUser ] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : false;
    if(token){
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.role === 'admin');
      setUser(true);
    }
  },[token]);


  const authRender = () => {

    if(user){
      return(<Link href="/sign-out" className="hover:text-gray-400">
            SignOut
      </Link>)
    }
    else{
      return(
        <>
        <Link href="/sign-in" className="hover:text-gray-400">
            SignIn
          </Link>
          <Link href="/sign-up" className="hover:text-gray-400">
            SignUp
        </Link>
        </>
      )
    }
  }

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Kazim K-POP</Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/menu" className="hover:text-gray-400">
            Menu
          </Link>
        </li>

        {isAdmin && <li>
          <Link href="/order-history" className="hover:text-gray-400">
            Orders 
          </Link>
        </li>}
        
        {isAdmin && <li>
          <Link href="/add-items" className="hover:text-gray-400">
            Add Items
          </Link>
        </li>}

        {authRender()}

      </ul>
    </nav>
  );
};

export default Navbar;
