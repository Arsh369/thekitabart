import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import ShoppingCart from './pages/ShoppingCart'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/cart' element={<ShoppingCart />} />
      </Routes>
    </Router>
  )
}

export default App