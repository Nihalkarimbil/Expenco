import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

function Landinavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.34-.21 2.62-.64 3.81-1.25C17.42 24.36 20 20.7 20 16.5V7l-8-5z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Expenco
          </span>
        </div>

        <Link href="/login">
          <Button
            variant="contained"
            color="primary"
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-2 px-4 rounded h-10"
            sx={{ borderRadius: 9999, color: "viloet" }}
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Landinavbar;
