import React, { useState, useEffect } from "react";
import { Search, User, Package, ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/TKA.jpg";
const Home = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    "History",
    "Novel",
    "Stories",
    "Poetry",
    "Motivational",
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
                <img className="h-8 sm:h-10 md:h-12 rounded" src={logo} alt="" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 flex-1 justify-end">
              {/* Search Bar */}
              <div className="relative flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm w-48 xl:w-64 2xl:w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="relative flex-shrink-0">
                <ShoppingCart
                  onClick={() => navigate("/cart")}
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>

              {/* Conditional rendering for Sign Up button or User Profile image */}
              {isLoggedIn ? (
                <div className="relative flex-shrink-0">
                  <Package
                    onClick={() => navigate("/order")}
                    className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 xl:px-6 py-2 rounded-lg font-semibold transition-colors text-sm flex-shrink-0"
                >
                  Sign up
                </button>
              )}
            </div>

            {/* Medium screens navigation */}
            <div className="hidden md:flex lg:hidden items-center space-x-3 flex-1 justify-end">
              <div className="relative flex-shrink-0">
                <ShoppingCart
                  onClick={() => navigate("/cart")}
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>

              {isLoggedIn ? (
                <div className="relative flex-shrink-0">
                  <Package
                    onClick={() => navigate("/order")}
                    className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-sm flex-shrink-0"
                >
                  Sign up
                </button>
              )}

              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 transition-colors p-1"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
              <div className="relative flex-shrink-0">
                <ShoppingCart
                  onClick={() => navigate("/cart")}
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 transition-colors p-1 flex-shrink-0"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-3 space-y-3 bg-white/95 backdrop-blur-md">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex flex-col space-y-2 pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      navigate("/order");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Package className="w-4 h-4" />
                    <span className="font-medium">My Orders</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-700 hover:text-blue-600 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-14 sm:pt-16 md:pt-18">
        {/* Hero Section */}
        <section
          className="relative h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center bg-gray-800"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://preview--read-ease-shop.lovable.app/assets/bookstore-hero-DTi4SFGX.jpg')",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4 max-w-4xl mx-auto">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                Discover Your Next Great Read
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-8 max-w-2xl mx-auto px-4">
                Explore the carefully curated collection of books across all genres
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => document.getElementById('books-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="py-4 sm:py-6 lg:py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "bg-white text-gray-800 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Books Grid */}
        <section id="books-section" className="py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id || book.id}
                    onClick={() => handleBookClick(book._id || book.id)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 p-3 sm:p-4 lg:p-5 cursor-pointer hover:transform hover:scale-105"
                  >
                    <div className="relative mb-3 sm:mb-4">
                      <img
                        src={book.image || "https://via.placeholder.com/150"}
                        alt={book.title}
                        className="w-full h-32 xs:h-36 sm:h-40 md:h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg line-clamp-2 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm truncate">{book.author}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                          {book.category || "N/A"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className="text-sm sm:text-base lg:text-lg font-bold text-blue-600">
                            ₹{book.price}
                          </span>
                          {book.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                        {book.originalPrice && (
                          <span className="text-xs bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                            Save ₹{(book.originalPrice - book.price).toFixed(0)}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(book);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-blue-600 cursor-pointer"><img className="h-8 sm:h-10 md:h-12 rounded" src={logo} alt="" /></div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                &copy; 2025 The Kitab Art Publication. All Rights Reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <ul className="flex justify-center md:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;