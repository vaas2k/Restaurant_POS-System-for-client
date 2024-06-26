'use client';
import Cart from './cart/page';
import Menu from './menu/page';
import OrderUpdates from '../components/OrderUpdates';
import { useState,useEffect } from 'react';
import jwt from 'jsonwebtoken'

export default function Home() {

  const [ isAdmin , setIsAdmin ] = useState(false);

  useEffect(()=>{
    const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : false;
    if(token){
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.role === 'admin');
    }
  },[]);

  
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
