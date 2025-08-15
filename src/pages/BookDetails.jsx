import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  // Get the book ID from the URL parameters
  const { id } = useParams();

  // State for managing the book data
  const [book, setBook] = useState(null);
  // State for managing the quantity of the book to be purchased
  const [quantity, setQuantity] = useState(1);
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle quantity change
  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prevQuantity => prevQuantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Fetch book details when the component mounts or the ID changes
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`,
          { withCredentials: false }
        );
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Conditional rendering for loading, error, and not found states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <p className="text-xl text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <p className="text-xl text-gray-600">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6 lg:p-12">
      {/* Back to Books Link */}
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Books
      </Link>

      <div className="mt-8 bg-white rounded-lg shadow-xl p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Book Image */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <img
              src={book.image}
              alt={book.title}
              className="w-full rounded-xl shadow-lg border border-gray-200"
            />
          </div>

          {/* Right side: Book Details */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <h2 className="text-xl font-medium text-gray-600 mb-4">by {book.author}</h2>

            
            {/* Categories */}
            <div className="flex space-x-2 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                {book.category || 'N/A'}
              </span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-gray-800 mb-6">₹{book.price.toFixed(2)}</p>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-lg font-bold text-gray-800">Quantity</span>
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="p-2 w-10 h-10 flex items-center justify-center text-xl font-bold text-indigo-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-medium text-gray-800">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="p-2 w-10 h-10 flex items-center justify-center text-xl font-bold text-indigo-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full lg:w-auto flex items-center justify-center px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
