import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("userId" , res.data._id);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Log in to your Account
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Input */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
              Email 
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 p-3 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Link for new users */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}