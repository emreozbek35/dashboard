import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-64 h-10 bg-gray-100 rounded-lg flex items-center px-3 border border-gray-200 hover:border-gray-300 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default Navbar;
