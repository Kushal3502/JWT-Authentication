import React from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const handleSignup = async (data) => {
    console.log(data);
    try {
      const response = await post("/signup", data);
      console.log(response);
      navigate("/verify");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Name:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("name", {
                required: "Name is required!",
              })}
            />
            {errors.name && (
              <div className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full mt-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address!",
                },
              })}
            />
            {errors.email && (
              <div className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full mt-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long!",
                },
              })}
            />
            {errors.password && (
              <div className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              isSubmitting && "opacity-70 cursor-not-allowed"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
