import React, { useContext, useState } from "react";
import axiosInstance from "../services/api";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginFormSchema from "../schema/LoginSchema";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  // panggil state authcontext yang beriri cookies
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      });
      // Set cookies jika login berhasil
      Cookies.set("token", response.data.data.token);
      Cookies.set("user", JSON.stringify(response.data.data.user));
      setIsAuthenticated(true);
      toast.success("Selamat datang");
    } catch (error) {
      console.error(
        "Error login:",
        error?.response?.data?.message || error.message
      );
      setLoginFailed(error?.response?.data);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          {/* Logo or Icon */}
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
              {/* <img
                width={"250px"}
                className=" text-blue-500"
                src="./icon.png"
              /> */}
            </div>
          </div>

          {/* Login Form */}
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-blue-400 mb-6">
            Login to access your laundry account
          </p>
          {loginFailed?.status?.description && (
            <p className="text-red-500 text-center text-sm italic">
              {loginFailed?.status?.description}
            </p>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
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
                      errors?.username || loginFailed?.status?.description
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : "border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    } rounded-lg `}
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors?.username && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.username.message}
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
                      errors?.password || loginFailed.status?.description
                        ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        : "border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    } rounded-lg `}
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors?.password && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-blue-400 text-sm mt-2">
              Don't have an account?{" "}
              <Link to={"/register"}>
                <a className="text-blue-500 font-semibold hover:underline">
                  Sign up
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
