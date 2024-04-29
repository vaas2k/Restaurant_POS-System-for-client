'use client';
import Cart from './cart/page';
import Menu from './menu/page';
import OrderUpdates from '../components/OrderUpdates';
import { useState,useEffect } from 'react';
import jwt from 'jsonwebtoken'
import Navbar from '../components/Navbar';

export default function Home() {

  const [ isAdmin , setIsAdmin ] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.role === 'admin');
    }
  },[localStorage.getItem('token')]);
  
  return (
    <>
      <div className={isAdmin && "grid grid-cols-12"}>
        <div className=" col-span-8 overflow-y-scroll h-screen">
          <Menu />
        </div>
        {isAdmin && <div className=" col-span-4">
          <Cart />
        <OrderUpdates /> 
        </div>}
      </div>
    </>
  );
}
