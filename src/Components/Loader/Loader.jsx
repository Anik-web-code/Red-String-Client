import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:transition-colors">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        <div className="absolute w-8 h-8 bg-blue-500 dark:bg-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
