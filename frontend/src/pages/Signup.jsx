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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700">Signup</h1>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("name", {
                required: "Name is required!!!",
              })}
            />
            {errors.name && (
              <div className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("email", {
                required: "Email is required!!!",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address!!!",
                },
              })}
            />
            {errors.email && (
              <div className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("password", {
                required: "Password is required!!!",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long!!!",
                },
              })}
            />
            {errors.password && (
              <div className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            {isSubmitting ? "Please wait" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
