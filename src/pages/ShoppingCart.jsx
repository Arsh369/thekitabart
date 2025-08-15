import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ShoppingCart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  // Function to handle quantity changes. This function updates the cart state, which in turn
  // will trigger the useEffect in App.jsx to save the changes to localStorage.
  const handleQuantityChange = (itemId, type) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item._id === itemId) {
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

  // Function to remove an item from the cart. This also updates the state
  // and persists the changes to localStorage.
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  // Calculate the order summary values
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Shopping Cart Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 mt-1 md:mt-2">{cartItems.length} items in your cart</p>
          </div>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center font-medium mt-4 sm:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Cart Items and Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id || item.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">by {item.author}</p>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, 'decrement')}
                        className="p-2 w-8 h-8 flex items-center justify-center text-md font-bold text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-md font-medium text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, 'increment')}
                        className="p-2 w-8 h-8 flex items-center justify-center text-md font-bold text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button onClick={() => handleRemoveItem(item._id || item.id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                Your cart is empty.
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-fit">
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
            <button 
            onClick={ () => navigate("/checkout") }
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
              Proceed to Checkout
            </button>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-center mt-4 transition-colors duration-200">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
