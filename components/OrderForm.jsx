import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import socketIO from 'socket.io-client';

const OrderForm = () => {
  const [open, setOpen] = useState(false);
  const [waiterName, setWaiterName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const { cartItems, clearCart } = useContext(CartContext);

  const router = useRouter();
  const socket = socketIO();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWaiterName('');
    setTableNumber('');
  };

  const handleSubmit = async () => {
    const orderData = {
      items: cartItems,
      waiterName,
      tableNumber,
    };

    console.log(orderData);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        handleClose();
        const dataToSend = orderData;
        const dataString = encodeURIComponent(JSON.stringify(dataToSend));
        socket.emit('newOrder', orderData); // Emit the newOrder event
        typeof window !== undefined ? window.open(`/order-receipt/${dataString}`, '_blank') : null;
      } else {
        console.error('Error submitting order:', response.status);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <Box py={'15px'}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Place Order
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Waiter Name"
            type="text"
            fullWidth
            value={waiterName}
            onChange={(e) => setWaiterName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Table Number"
            type="text"
            fullWidth
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderForm;