import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";

import Link from "next/link";

function Hero() {
    
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 mx-auto">
        <div className="md:w-1/2 max-w-xl mx-auto md:mx-0 mb-10 md:mb-0">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Welcome to{" "}
              <span className=" dark:text-blue-400 text-gradient-to-br from-blue-500 to-purple-600">
                Expenco
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              The smart way to track, manage, and optimize your expenses
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href={"/login"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className=" dark:bg-gray-800 w-full max-w-md h-80 mb-0 md:mb-10">
            <Image
              src={
                "https://i.pinimg.com/736x/03/c1/23/03c1239b25e0ef215019e327a9cc81a0.jpg"
              }
              alt="Expenco"
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
