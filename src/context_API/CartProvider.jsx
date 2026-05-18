'use client'; // Required for Context and hooks

import { createContext, useState, useEffect } from "react";

// 1. Create the context
export const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
  // Initialize with an empty array. Do NOT call localStorage here.
  const [cartItems, setCartItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // 3. Load initial data from localStorage ONLY after component mounts on the client
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsMounted(true); // Mark that the component has mounted in the browser
  }, []);

  // 4. Save cartItems to local storage whenever it changes, but only after mounting
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems"); // Ensure this matches your storage key
  };
  const handleRemoveCartItems = () => {
    setCartItems([]);
  };

  // 5. Create the context value
  const contextValue = {
    cartItems,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleRemoveCartItems,
    clearCart
  };

  // Avoid hydration mismatch by waiting for the client-side mount if needed, 
  // but providing the context is generally safe right away.
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};