import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Cart from './Cart';
import { FaShoppingCart } from 'react-icons/fa';

const Products = ({ setPriceFilter, products }) => {
  const [showCart, setShowCart] = useState(false);
  
 
  
  return (
    <div className="border-t border-amber-400 mt-6 p-4">
      <div className="grid grid-cols-[0.75fr_3.25fr] gap-4">


        <div className="relative">
          {showCart && (
            <div
              className="fixed inset-0 bg-opacity-40 z-40"
              onClick={() => setShowCart(false)}
            />
          )}

          {showCart && (
            <div className="fixed right-0 top-0 h-full w-120 bg-white shadow-lg z-50 p-4 overflow-y-auto border rounded">
              <button
                onClick={() => setShowCart(false)}
                className="text-red-600 font-semibold mb-4"
              >
                Close
              </button>
              <Cart />
            </div>
          )}

          <div className="p-4">
            {!showCart && (
              <button
                onClick={() => setShowCart(true)}
                className="relative inline-flex items-center gap-2 px-6 py-2  text-black font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                >
 <FaShoppingCart />
 View Cart             </button>
            )}

            <Filters setPriceFilter={setPriceFilter} />
          </div>
        </div>

        <div className="p-5">
          <h2 className="p-2 font-serif text-3xl">All Products</h2>

          <ul className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <li key={index}>
                <ProductCard
                  product={product}  
                />

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
