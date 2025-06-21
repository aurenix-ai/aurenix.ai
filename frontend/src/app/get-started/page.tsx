"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email format.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    // Simulate form submission
    console.log(`${mode === "login" ? "Logging in" : "Signing up"} with`, email, password);
    alert(`${mode === "login" ? "Login" : "Signup"} successful!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-1000 light:bg-gray-200 p-4">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[500px] h-[500px] bg-red-800 rounded-full opacity-20 blur-3xl" />
    </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-black light:bg-gray-100 rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-200 light:text-gray-900">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200 light:text-gray-900">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 text-sm text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            {mode === "login" ? "Login" : "Signup"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-300">
          <span className="px-2">OR</span>
        </div>

        <button className="w-full flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black transition">
          <FcGoogle className="text-xl mr-2" /> Continue with Google
        </button>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-300">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-500 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
