import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity, selectedSize) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { product, quantity, size: selectedSize }]);
    }
  };

  const removeFromCart = (productId, size) => {
    const updatedItems = cartItems.filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    setCartItems(updatedItems);
  };

  const clearCart = () => {
  setCartItems([]); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
