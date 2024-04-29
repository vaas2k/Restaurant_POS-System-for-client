'use client'
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const OrderReceipt = ({ params }) => {
  const componentRef = useRef({});

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const items = params.id ? JSON.parse(decodeURIComponent(params.id)) : null;
  console.log(items);

  return (
    <div className="p-4">
      <button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Print Receipt
      </button>
      <div style={{ display: 'none' }}>
        <PrintContent ref={componentRef} cartItems={items.items} />
      </div>
    </div>
  );
};

const PrintContent = React.forwardRef(function PrintContent({ cartItems }, ref) {
  let total = 0;

  return (
    <div ref={ref} className="p-4 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Receipt</h1>
      <p className="mb-2">Thank you for your order!</p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Item</th>
            <th className="p-2 border border-gray-300">Quantity</th>
            <th className="p-2 border border-gray-300">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;
            return (
              <tr key={item._id}>
                <td className="p-2 border border-gray-300">{item.name}</td>
                <td className="p-2 border border-gray-300">{item.quantity}</td>
                <td className="p-2 border border-gray-300">${itemTotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="p-2 border border-gray-300 font-bold">Total:</td>
            <td className="p-2 border border-gray-300 font-bold">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

PrintContent.displayName = 'PrintContent'; // Add display name to the PrintContent component

export default OrderReceipt;
