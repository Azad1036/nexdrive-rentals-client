import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6 text-center">
          <img
            className="w-24 mx-auto"
            src="https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo.c36eaf5e6.svg"
            alt="LeetCode Logo"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <input
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="text"
            placeholder="Username or Email"
          />
          <input
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="password"
            placeholder="Password"
          />
          <button className="w-full p-3 text-white bg-gradient-to-r from-gray-800 to-gray-600 rounded-md hover:opacity-90">
            Sign in
          </button>
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
          <a href="#" className="hover:underline">
            Sign up
          </a>
        </div>
        <div className="mt-5 text-center text-gray-400">or sign in with</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full 
        transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaGoogle size={20} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full 
        transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaGithub size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
