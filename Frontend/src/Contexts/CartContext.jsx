import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cartData]);

  const isInCart = (product) => {
    if (!product || !product._id) return false;
    return cartData.some((item) => item._id === product._id);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id) {
      console.warn("Invalid product passed to addToCart:", product);
      return;
    }

    setCartData((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const handleIncrease = (product) => {
    if (!product || !product._id) return;

    setCartData((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleDecrease = (product) => {
    if (!product || !product._id) return;

    setCartData((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        if (existing.quantity > 1) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prev.filter((item) => item._id !== product._id);
        }
      }
      return prev;
    });
  };

  const removeFromCart = (product) => {
    if (!product || !product._id) return;

    setCartData((prev) =>
      prev.filter((item) => item._id !== product._id)
    );
  };

  const clearCart = () => {
    setCartData([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        removeFromCart,
        handleIncrease,
        handleDecrease,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
