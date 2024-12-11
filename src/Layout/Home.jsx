import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import { Outlet, useLocation } from "react-router-dom";
const Home = () => {
  const [isOpen, setIsSidebarOpen] = useState(true); // Ini yang mengontrol status sidebar
  const location = useLocation;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isOpen); // Fungsi untuk toggle status sidebar
  };

  return (
    <div className="container">
      <div className="flex w-screen h-screen fixed overflow-hidden">
        <Sidebar isOpen={isOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Topbar toggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-auto bg-gray-100 p-6">
            <div className="space-y-4">
              <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
                {/* content
                {location.pathname === "/" ? (
                  <Dashboard /> // Tampilkan Dashboard jika di root
                ) : (
                  <Outlet /> // Tampilkan konten anak rute
                )} */}
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
