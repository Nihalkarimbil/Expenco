import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

function Landinavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          Expenco
        </div>

        <Link href="/login">
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-700 text-white py-2 px-4 rounded h-10"
            sx={{borderRadius: 9999, color: "viloet"}}
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Landinavbar;
