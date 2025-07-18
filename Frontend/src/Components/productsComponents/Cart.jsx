import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart({ onClose }) {
  const {
    clearCart,
    cartData,
    removeFromCart,
    handleIncrease,
    handleDecrease,
  } = useCart();
 const navigate = useNavigate();
  const totalPrice = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const procceedToCheckout = ()=>{
navigate('/detailsForm');
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={clearCart}
          className="text-sm font-medium border border-gray-400 rounded px-4 py-1 hover:bg-gray-100"
        >
          Clear Cart
        </button>
        <div className="text-lg font-semibold text-gray-800">
          Total: $ {totalPrice.toFixed(2)}
        </div>
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-5">
          {cartData.map((product) => (
            <div
              key={product._id}
              className="relative flex justify-between items-center gap-6 bg-gray-50 rounded-lg border border-gray-200 p-4"
            >
              <button
                onClick={() => removeFromCart(product)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
                aria-label="Remove"
              >
                ×
              </button>

              <img
                src={product.images?.[0] || 'https://via.placeholder.com/100'}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md border"
              />

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <p className="text-base font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">$ {product.price}</p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrease(product)}
                    disabled={product.quantity === 0}
                    className={`px-3 py-1 rounded border text-sm ${
                      product.quantity === 0
                        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'text-gray-700 border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    –
                  </button>
                  <span className="min-w-[30px] text-center text-sm">{product.quantity}</span>
                  <button
                    onClick={() => handleIncrease(product)}
                    className="px-3 py-1 rounded border border-gray-400 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button disabled={cartData.length === 0} onClick={procceedToCheckout} className='mt-10 bg-green-500 hover:bg-green-700 rounded w-full h-9 items-end'>Procceed to Checkout</button>
    </div>
  );
}
