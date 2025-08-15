import React ,{ useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import ShoppingCart from './pages/ShoppingCart'
import Checkout from './pages/Checkout'
const App = () => {

    const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  // Use a useEffect hook to save the cart items to localStorage whenever the state changes.
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<BookDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  )
}

export default App