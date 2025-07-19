"use client";

import toast from "react-hot-toast";
import { signIn } from "../lib/auth";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-cyan-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6 py-11">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500">Login to your Exam Reminder account</p>

        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 rounded-lg py-3 px-5 hover:shadow-lg transition duration-200 w-full cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-400 pt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 underline hover:text-blue-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline hover:text-blue-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
