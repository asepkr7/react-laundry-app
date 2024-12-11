const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      {/* Outer Ring */}
      <div className="relative w-24 h-24 border-8 border-blue-200 border-t-blue-500 rounded-full animate-spin">
        {/* Inner Circle */}
        <div className="absolute inset-2 bg-blue-50 rounded-full shadow-inner"></div>
        {/* Bubbles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2 animate-bubble-rise">
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
        </div>
      </div>
      {/* Themed Loading Text */}
      <p className="mt-6 text-center text-xl font-semibold text-blue-600">
        <span className="text-blue-400">Please wait</span>
      </p>
    </div>
  );
};

export default Loader;
