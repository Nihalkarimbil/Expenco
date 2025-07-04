

import Link from "next/link";
import React from "react";
import { CiCalculator1 } from "react-icons/ci";
import { FaRegChartBar, FaRegMoneyBillAlt } from "react-icons/fa";

function Features() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-60 w-full flex items-center justify-between mx-auto px-4 md:px-8 lg:px-28">
      <Link href="/login">
        <div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
          <div className="rounded-full bg-white h-20 w-20 flex items-center justify-center shadow-lg">
            <CiCalculator1 size={32} className="text-blue-500" />
          </div>
          <h1 className="text-lg font-semibold text-white">Track Expenses</h1>
        </div>
      </Link>
      <Link href="/login">
        <div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
          <div className="rounded-full bg-white h-20 w-20 flex items-center justify-center shadow-lg">
            <FaRegMoneyBillAlt size={32} className="text-blue-500" />
          </div>
          <h1 className="text-lg font-semibold text-gray-100">
            Plan The Budget
          </h1>
        </div>
      </Link>
      <Link href="/login">
        <div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
          <div className="rounded-full bg-white h-20 w-20 flex items-center justify-center shadow-lg">
            <FaRegChartBar size={32} className="text-blue-500" />
          </div>
          <h1 className="text-lg font-semibold text-white">View Insights</h1>
        </div>
      </Link>
    </div>
  );
}

export default Features;
