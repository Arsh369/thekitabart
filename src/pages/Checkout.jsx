import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import countries from "../assets/countries";
import axios from "axios";

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("userId");
  // Form state for customer information
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Form state for delivery address
  const [deliveryAddress, setDeliveryAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Form state for special instructions
  const [deliveryNote, setDeliveryNote] = useState("");

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  useEffect(() => {
    // Check if the cart is empty, and if so, redirect back to the cart page
    if (cartItems.length === 0) {
      navigate("/cart");
    }

    // Calculate order summary whenever cartItems changes
    const calculatedSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxRate = 0.08;
    const calculatedTax = calculatedSubtotal * taxRate;
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [cartItems, navigate]);

  // Handle form input changes for customer info
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form input changes for delivery address
  const handleDeliveryAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      // Order data with books
      const orderData = {
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        phoneNumber: customerInfo.phoneNumber,
        streetAddress: deliveryAddress.streetAddress,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        zipCode: deliveryAddress.zipCode,
        country: deliveryAddress.country,
        deliveryNote: deliveryNote,
        paymentMethod,
        books: cartItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        userId,
      };

      console.log("Placing order with the following data:", orderData);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderData
      );

      console.log("Order placed successfully:", data);

      setCartItems([]);
      navigate("/");
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/cart"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Cart
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number *"
                  value={customerInfo.phoneNumber}
                  onChange={handleCustomerInfoChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Street Address *"
                    value={deliveryAddress.streetAddress}
                    onChange={handleDeliveryAddressChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={deliveryAddress.city}
                  onChange={handleDeliveryAddressChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={deliveryAddress.state}
                  onChange={handleDeliveryAddressChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code *"
                  value={deliveryAddress.zipCode}
                  onChange={handleDeliveryAddressChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <select
                  name="country"
                  value={deliveryAddress.country}
                  onChange={handleDeliveryAddressChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {!deliveryAddress.country && (
                    <option value="" disabled>
                      Select your country
                    </option>
                  )}
                  {countries.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Special Instructions
              </h2>
              <textarea
                name="deliveryNote"
                placeholder="Any special delivery instructions..."
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={() => setPaymentMethod("cashOnDelivery")}
                  className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="cashOnDelivery" className="flex-grow">
                  <span className="font-semibold">Cash on Delivery</span>
                  <p className="text-sm text-gray-500">
                    Pay when your order is delivered to your doorstep
                  </p>
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg text-lg"
            >
              Place Order - ₹{total.toFixed(2)}
            </button>
          </div>

          {/* Order Summary */}
          <div className="h-fit">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-indigo-600">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
