import React from 'react';

function Dashboard() {
  return (
    <>
    <div className="p-6">
      <div className="flex justify-between w-full max-w-full bg-amber-50 mx-auto ">
        <div className="text-center font-semibold  bg-gray-100 p-4 rounded-lg">Total Expense: $1000</div>
        <div className="text-center font-semibold  bg-gray-100 p-4 rounded-lg">Budget: $2000</div>
        <div className="text-center font-semibold  bg-gray-100 p-4 rounded-lg">Balance: $1000</div>
      </div>
    </div>
    </>
    
  );
}

export default Dashboard;
