import React, { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Books");

  // State to check if a user token is present
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for managing the shopping cart. Load from localStorage on initial render.
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

  useEffect(() => {
    // Check for a token in local storage or cookies to determine login status
    const token = localStorage.getItem("token"); // or use a more robust check
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books`,
          { withCredentials: false }
        );
        console.log(res.data);
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter books on search and category change
  useEffect(() => {
    let tempBooks = books;

    // Filter by search query first
    if (searchQuery.trim()) {
      tempBooks = tempBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Then filter by selected category
    if (selectedCategory !== "All Books") {
      tempBooks = tempBooks.filter(
        (book) => book.category === selectedCategory
      );
    }

    setFilteredBooks(tempBooks);
  }, [searchQuery, selectedCategory, books]);

  // The categories for the filter
  const categories = [
    "All Books",
    "Fiction",
    "Non-fiction",
    "Education",
    "Children",
    "Comics",
    "Other",
  ];

  // Handler to navigate to book details page
  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleAddToCart = (book) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item._id === book._id);

    if (existingItem) {
      // If it exists, update the quantity
      setCartItems(
        cartItems.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If it's a new item, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">JB</div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-lg pl-8 pr-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="relative">
                <ShoppingCart
                  onClick={() => navigate("/cart")}
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600"
                />
              </div>

              {/* Conditional rendering for Sign Up button or User Profile image */}
              {isLoggedIn ? (
                // Show profile image if logged in
                <div className="cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1755004609214-c252674df1ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
                    alt="User Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
              ) : (
                // Show Sign up button if not logged in
                <div className="hidden sm:flex gap-4">
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-gray-800"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://preview--read-ease-shop.lovable.app/assets/bookstore-hero-DTi4SFGX.jpg')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Explore the carefully curated collection of books across all
              genres
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book._id || book.id}
                onClick={() => handleBookClick(book._id || book.id)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
              >
                <div className="relative mb-4">
                  <img
                    src={book.image || "https://via.placeholder.com/150"}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg truncate">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                      {book.category || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">
                        ₹{book.price}
                      </span>
                      {book.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{book.originalPrice}
                        </span>
                      )}
                    </div>
                    {book.originalPrice && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Save ₹{(book.originalPrice - book.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(book);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors mt-4 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
