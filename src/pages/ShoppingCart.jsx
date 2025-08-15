import React, { useState } from 'react';

const ShoppingCart = () => {
  // Dummy data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "https://placehold.co/100x100/90c6ff/284984?text=Author",
      title: "Atomic Habits",
      author: "James Clear",
      price: 27.99,
      quantity: 2
    },
  ]);

  // Function to handle quantity changes
  const handleQuantityChange = (itemId, type) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          if (type === 'increment') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (type === 'decrement' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Calculate order summary
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Shopping Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
          </div>
          <a href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </a>
        </div>

        {/* Cart Items and Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">by {item.author}</p>
                  <p className="text-sm text-gray-500 mt-1">₹{item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, 'decrement')}
                      className="p-2 w-8 h-8 flex items-center justify-center text-md font-bold text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-md font-medium text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 'increment')}
                      className="p-2 w-8 h-8 flex items-center justify-center text-md font-bold text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-indigo-600">₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
              Proceed to Checkout
            </button>
            <a href="/" className="text-indigo-600 hover:text-indigo-800 text-center mt-4 transition-colors duration-200">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
