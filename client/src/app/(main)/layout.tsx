import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import React, { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <Navbar />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-4 overflow-auto  md:ml-64 mt-16  ">{children}</main>
      </div>
    </div> 
  );
};

export default Layout;