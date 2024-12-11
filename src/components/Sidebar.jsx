import React from "react";
import { FaTshirt, FaUsers, FaMoneyBill, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-blue-700 text-white h-full fixed overflow-hidden top-0 left-0 transition-all duration-300 flex flex-col`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center p-4">
        {/* Logo and Text on the left */}
        {isOpen && (
          <Link to={"/dashboard"}>
            <div className="flex items-center">
              <img src="/icon.png" alt="Enigma Logo" className="w-16 h-16" />
              <span className="ml-2 text-lg font-aqua tracking-wide">
                Enigma Laundry
              </span>
            </div>
          </Link>
        )}

        {/* Hamburger Button in the right */}
        <button
          onClick={() => setIsSidebarOpen(!isOpen)} // Toggle sidebar state
          className="text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>
      <hr />
      {/* Navigation */}
      <nav className="flex flex-col mt-4 space-y-1">
        <Link to={"/dashboard/products"}>
          <a className="flex items-center p-3 hover:bg-blue-600 rounded-md">
            <FaTshirt className="mr-3" />
            {isOpen && "Products"}
          </a>
        </Link>
        <Link to={"/dashboard/customers"}>
          <a className="flex items-center p-3 hover:bg-blue-600 rounded-md">
            <FaUsers className="mr-3" />
            {isOpen && "Customers"}
          </a>
        </Link>
        <Link to={"/dashboard/transactions"}>
          <a className="flex items-center p-3 hover:bg-blue-600 rounded-md">
            <FaMoneyBill className="mr-3" />
            {isOpen && "Transactions"}
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
