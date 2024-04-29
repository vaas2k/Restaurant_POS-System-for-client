'use client';

import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

  const handleDateChange = (event, dateType) => {
    const value = event.target.value;
    if (dateType === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  return (
    <div className="p-4">
      <h2>Order History</h2>
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => handleDateChange(event, 'startDate')}
          className="mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
        />
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mt-2">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => handleDateChange(event, 'endDate')}
          className="mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      {orders.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No orders found.</p>
      ) : (
        <div className="mt-4 overflow-x-auto shadow rounded-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Waiter
                </th>
                <th scope="col" className="px-6 py-3">
                  Table Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Items
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(new Date(order.createdAt))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.waiterName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.tableNumber}
                  </td>
                  <td className="px-6 py-4">
                    <ul className="list-disc pl-4">
                      {order.items.map((item) => (
                        <li key={item._id} className="py-1">
                          {item.name} - Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;