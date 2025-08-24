import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "../../store/useAppStore.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signup(name, email, password);
      // Redirect based on user role
      navigate(newUser?.role === 'admin' ? '/dashboard' : '/');
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Sign up</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
