import React from "react";
import { Helmet } from "react-helmet";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-100 relative overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="bubble w-20 h-20 bg-blue-300 opacity-50 animate-bubble rounded-full"></div>
          <div className="bubble w-24 h-24 bg-blue-200 opacity-40 animate-bubble rounded-full"></div>
          <div className="bubble w-16 h-16 bg-blue-400 opacity-60 animate-bubble rounded-full"></div>
        </div>

        {/* Main Content */}
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-xl text-blue-600 mb-6 flex items-center space-x-2">
          <FaSadTear className="text-2xl" />
          <span>Oops! We couldn’t find that page.</span>
        </p>
        <p className="text-lg text-blue-500 mb-8">
          It seems like a lost sock in the laundry machine.
        </p>

        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Back to Home
        </a>

        <div className="absolute bottom-0 w-full flex justify-center">
          <img
            src="/washing-machine.png"
            alt="Washing Machine"
            className="w-40 h-40 animate-bounce"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
