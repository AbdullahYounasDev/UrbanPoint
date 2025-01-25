/** @format */

"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users", formData);
      if (!res) {
        throw new Error("Error is Response");
      }
      router.push("/login");
    } catch (error) {
      console.error("Error:" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-1"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-1"
              required
            />
          </div>

          {loading ? (
            <button
              disabled
              className="w-full bg-sky-1 text-white py-2 px-4 rounded-lg hover:bg-sky-1 focus:outline-none focus:ring-2 focus:ring-sky-1">
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-sky-1 text-white py-2 px-4 rounded-lg hover:bg-sky-1 focus:outline-none focus:ring-2 focus:ring-sky-1">
              Sign Up
            </button>
          )}
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
