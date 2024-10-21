import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";

function EmailVerification() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(code);
    setIsSubmitting(true);
    try {
      const response = await post("/verify-email", { code });
      console.log(response);
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Verify your Account
        </h1>
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-semibold text-gray-700"
            >
              Verification Code:
            </label>
            <input
              id="code"
              type="password"
              placeholder="******"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              isSubmitting && "opacity-70 cursor-not-allowed"
            }`}
            disabled={isSubmitting}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailVerification;
