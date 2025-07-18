import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';
import api from '../../Services/api';

const ConfirmationOrder = ({ onClose }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrder = localStorage.getItem('latestOrder');
    setOrder(JSON.parse(getOrder));
  }, []);


  const returnToHome = async () => {
    console.log(order.email);
    try {
      await api.post('orders/send-email', {
        to: `${order.email}`,
        text: 'Thank you for your order! Your order has been successfully placed.'
      });

      console.log('Confirmation email sent');
    } catch (err) {
      console.error('Email sending failed', err);
    }

    clearCart();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-5">
        <h2 className="text-2xl font-bold text-green-700">✅ Order Confirmed</h2>
        <p className="text-gray-600">Thank you! Your order has been successfully placed.</p>
        <button
          onClick={returnToHome}
          className="mt-4 px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationOrder;
