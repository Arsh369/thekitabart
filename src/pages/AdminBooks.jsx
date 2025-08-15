import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

  // Fetch all books
  const fetchBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/books`
    );
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Create or Update book
const handleSubmit = async (e) => {
  e.preventDefault();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  if (editId) {
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/books/${editId}`,
      form,
      config
    );
  } else {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/books`,
      form,
      config
    );
  }

  setForm({
    title: "",
    author: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    description: "",
  });
  setEditId(null);
  fetchBooks();
};


  // Delete book
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
  };

  // Edit book
  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      originalPrice: book.originalPrice,
      image: book.image,
      category: book.category,
      description: book.description,
    });
    setEditId(book._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Books</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <select 
        className="border p-2 w-full"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        name="category" id="">
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Education">Education</option>
          <option value="Children">Children</option>
          <option value="Comics">Comics</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Book List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Original Price</th>
            <th className="p-2 border">Image URL</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">₹{book.price}</td>
              <td className="p-2 border">₹{book.originalPrice}</td>
              <td className="p-2 border">{book.image}</td>
              <td className="p-2 border">{book.category}</td>
              <td className="p-2 border">{book.description}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
