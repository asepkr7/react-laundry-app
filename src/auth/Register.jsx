import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schema/RegisterSchema";
import axiosInstance from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        role: "employee",
      });
      navigate("/login");
      toast.success("Registrasi berhasil");
    } catch (error) {
      console.error(
        "Error login:",
        error?.response?.data?.message || error.message
      );
      console.log(error.response);
      toast.error("Gagal Registrasi");
    }
  };
  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>

      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          {/* Logo or Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 border-4 border-blue-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16h8m0 0v4m0-4H8m0 0v4M4 16a4 4 0 014-4h8a4 4 0 014 4v4m-8-10a4 4 0 110-8 4 4 0 010 8z"
                />
              </svg>
            </div>
          </div>

          {/* Register Form */}
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Create Your Account
          </h2>
          <p className="text-sm text-center text-blue-400 mb-6">
            Join us to manage your laundry with ease
          </p>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-4">
              <label
                className="block text-blue-600 font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full px-4 py-2 border ${
                      errors.name
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : " border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    }  rounded-lg `}
                    placeholder="Enter your full name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-blue-600 font-medium mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full shadow px-4 py-2 border ${
                      errors.username
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : "border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    } rounded-lg `}
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-blue-600 font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className={`w-full shadow px-4 py-2 border ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : "border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    } rounded-lg `}
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block  text-blue-600 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`w-full shadow px-4 py-2 border ${
                      errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : "border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    } rounded-lg `}
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-blue-400 text-sm">
              Already have an account?
              <Link className="" to={"/login"}>
                <a className="text-blue-500 font-semibold hover:underline">
                  Login
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
