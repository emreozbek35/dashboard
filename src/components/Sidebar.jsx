import React from "react";

function Sidebar() {
  const menuItems = [
    { name: "Home", icon: "home" },
    { name: "Excel", icon: "file-spreadsheet" },
  ];

  return (
    <div className="bg-white shadow-sm h-screen flex-shrink-0 overflow-y-auto w-16">
      <div className="p-3">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center py-3 rounded-lg cursor-pointer ${
                index === 0
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon === "home" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 ${
                    index === 0 ? "text-purple-600" : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 ${
                    index === 0 ? "text-purple-600" : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <rect x="8" y="12" width="8" height="2"></rect>
                  <rect x="8" y="16" width="8" height="2"></rect>
                  <path d="M10 8H8"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
