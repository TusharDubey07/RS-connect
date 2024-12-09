import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-white font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;