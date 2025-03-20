"use client";

import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "@/lib/schema/validation";
import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const { loginUser, loading, error, isSucces } = useAuthStore();
  const navigate = useRouter();
  const { errors, handleChange, values, touched, handleBlur, resetForm } =
    useFormik({
      validationSchema: loginSchema,
      initialValues,
      onSubmit() {},
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    await loginUser({ email, password });
    resetForm();
    if (isSucces) {
      navigate.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              value={values.email}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded mt-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link href={"/register"}>
         
          <h1 className="text-center mt-3 text-blue-400">you dont have an account create it!</h1>
          </Link>
        </form>
          
        {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
