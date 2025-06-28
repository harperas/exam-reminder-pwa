"use client";

import { signIn } from "../lib/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login to Exam Reminder</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          signIn("google", { callbackUrl: "/dashboard" }); // ✅
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
