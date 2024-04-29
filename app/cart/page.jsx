'use client'
import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CartContext } from '../../context/CartContext';
import OrderForm from '../../components/OrderForm';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId, action) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      const newQuantity =
        action === 'increase' ? item.quantity + 1 : item.quantity - 1;
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-5 "
    style={{maxHeight:'85vh', overflow:'auto'}}
    >
      <Typography variant="h4" className="font-bold text-gray-800">Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" className="text-gray-500 text-center mt-4">
          Your cart is empty
        </Typography>
      ) : (
        <div className="mt-4">
          {cartItems && cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-4 border-b border-gray-200 pb-2 flex-col ">
              <Typography variant="body1"  className="font-large text-gray-800 mr-4 py-[15px]">
                {item.name} - Quantity: {item.quantity}
              </Typography>

              <div className="flex items-center gap-[10px]">
                <Button
                  variant="outlined"
                  color="secondary"
                  className="mr-2 rounded-full px-2 py-1 disabled:text-gray-400 disabled:border-gray-400"
                  onClick={() => handleQuantityChange(item._id, 'decrease')}
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
                
                <Typography variant="body1" className="mx-2 px-[2px] text-gray-800">
                  {item.quantity}
                </Typography>

                <Button
                  variant="outlined"
                  color="secondary"
                  className="rounded-full pr-[20px] py-1 disabled:text-gray-400 disabled:border-gray-400"
                  onClick={() => handleQuantityChange(item._id, 'increase')}
                >
                  +
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  className="ml-4 rounded-full pl-[20px] py-3 text-white"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <OrderForm />
          <Button
            variant="contained"
            color="primary"
            className="mt-4 w-full rounded-md py-2 text-white"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
