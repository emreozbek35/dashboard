import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-36 h-8 bg-gray-50 rounded-full flex items-center justify-center">
          <span className="text-sm text-gray-500">Search...</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default Navbar;
