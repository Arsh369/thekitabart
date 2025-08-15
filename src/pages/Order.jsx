import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,{
          params: {
            userId,
          },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Customer</th>
                  <th className="border border-gray-300 px-4 py-2">Books</th>
                  <th className="border border-gray-300 px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-4 py-2">Delivery Note</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <p className="font-semibold">{order.fullName}</p>
                      <p className="text-sm text-gray-600">{order.email}</p>
                      <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.books.map((book, i) => (
                        <p key={i} className="text-sm">
                          {book.title} × {book.quantity} — ₹{book.price.toFixed(2)}
                        </p>
                      ))}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{`${order.streetAddress}, ${order.city}, ${order.state}, ${order.zipCode}, ${order.country}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.deliveryNote}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
