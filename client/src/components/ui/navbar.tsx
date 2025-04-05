import React from "react";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand Name */}
        <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-white">
          Expenco
        </div>

        {/* Log Out Button */}
        <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
