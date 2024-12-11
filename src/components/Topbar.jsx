import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { logOut } = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="static top-0 left-0 w-full bg-white p-4 shadow-md border-b border-gray-200 z-10 flex justify-between items-center ">
      <h1 className="text-md font-semibold text-gray-800 ml-4">Dashboard</h1>
      <div className="relative">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center text-gray-700"
        >
          <FaUserCircle className="text-2xl" />
        </button>
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200">
            <button
              onClick={handleLogOut}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
