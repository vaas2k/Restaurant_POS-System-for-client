'use client'
import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';

const socket = socketIO();

const OrderUpdates = () => {
  // Use localStorage for state persistence
  const initialOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    // Update localStorage whenever orders state changes
    localStorage.setItem('orders', JSON.stringify(orders));

    socket.on('orderUpdate', (order) => {
      setOrders((prevOrders) => [...prevOrders, order]);
    });

    // Cleanup function: Remove socket listener and clear orders after 24hrs
    return () => {
      socket.off('orderUpdate');
      const timeoutId = setTimeout(() => setOrders([]), 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      return () => clearTimeout(timeoutId); // Clear timeout on component unmount
    };
  }, [orders]); // Re-run useEffect only when orders state changes

  const handleRemoveOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  return (
    <div className="order-updates bg-gray-100 shadow rounded-md p-4">
      <h2 className="text-xl font-bold mb-2">New Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No new orders yet.</p>
      ) : (
        <ul className="list-disc space-y-2">
          {orders.map((order, index) => (
            <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md">
              <div className="flex flex-col space-y-1">
                <p className="text-gray-700 font-medium">Waiter: {order.waiterName}</p>
                <p className="text-gray-500">Table: {order.tableNumber}</p>
              </div>
              <div className="text-gray-500 text-right">
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleRemoveOrder(index)}
                >
                  Remove
                </button>
              </div>
              <ul className="pl-4 list-disc text-gray-600 space-y-1 mt-1">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderUpdates;
