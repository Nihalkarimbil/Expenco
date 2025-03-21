"use client"

import { useAuthStore } from '@/lib/stores/useAuthstore';
import Link from 'next/link';
import React, { useState } from 'react';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const {user}=useAuthStore()
 
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' ,path:"/dashbord"},
    { id: 'expenses', label: 'Expenses', icon: 'dollar-sign' ,path:"/expence"},
    { id: 'budget', label: 'Budget', icon: 'pie-chart' ,path:"/budget"},
    { id: 'reports', label: 'Reports', icon: 'bar-chart-2',path:"/report" },
    
  ];

  return (
    <div className="h-screen bg-white text-blue-500 w-64 flex flex-col shadow-2xl fixed">
    
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className="text-xl font-bold">Expenco</h1>
        </div>
      </div>

      <div className="p-4 border-b border-blue-700 bg-blue-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-lg font-semibold">JD</span>
          </div>
          <div>
            <h3 className="font-medium text-white">{user?.username}</h3>
            <p className="text-sm text-white">Free Account</p>
          </div>
        </div>
      </div>

   
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
            
            <li >
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                  activeItem === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex-shrink-0">
                  {renderIcon(item.icon)}
                </span>
                <span>{item.label}</span>
                
              </button>
            </li>
            </Link>
          ))}
         
        </ul>
      </nav>

      <div className="p-4 m-4 bg-blue-700 rounded-lg">
        <p className="text-sm text-white">Current Balance</p>
        <p className="text-2xl font-bold text-white">$2,450.25</p>
        <div className="flex justify-between mt-2 text-sm">
          <div>
            <p className="text-white">Income</p>
            <p className="text-green-500">+$1,840</p>
          </div>
          <div>
            <p className="text-white">Expenses</p>
            <p className="text-red-500">-$580</p>
          </div>
        </div>
      </div>

     
    </div>
  );
}


function renderIcon(iconName:string) {
  switch (iconName) {
    case 'grid':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      );
    case 'dollar-sign':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
    case 'pie-chart':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
        </svg>
      );
    case 'bar-chart-2':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      );
    
    default:
      return null;
  }
}

export default Sidebar;