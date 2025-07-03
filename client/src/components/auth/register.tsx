"use client";

import React from "react";
import { useFormik } from "formik";
import { userSchema } from "@/lib/schema/validation";
import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const { registeruser, loading, error } = useAuthStore();
  const navigate=useRouter()
  const { errors, handleChange, values, touched, handleBlur ,resetForm} = useFormik({
    validationSchema: userSchema,
    initialValues,
    onSubmit() {
      // console.log("Submitting values:", values);
      // const { username, email, password } = values;
      //   registeruser({ username, email, password });
      // resetForm();
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = values;
    await registeruser({ id: "", username, email, password });
    resetForm()
    navigate.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={values.username}
            />
            {errors.username && touched.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
          </div>

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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
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
            {loading ? "Submitting..." : "Submit"}
          </button>
          <Link href={"/login"}>
         
         <h1 className="text-center mt-3 text-blue-400">you have an account login!</h1>
         </Link>
        </form>

        {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default Register;
