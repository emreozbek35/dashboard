import React from "react";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: "grid" },
    { name: "Sales", icon: "dollar-sign" },
    { name: "Inventory", icon: "package" },
    { name: "Customers", icon: "users" },
    { name: "Reports", icon: "bar-chart-2" },
    { name: "Settings", icon: "settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-screen flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
                index === 0
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-5 h-5 ${
                  index === 0 ? "text-purple-600" : "text-gray-400"
                }`}
              >
                {/* Placeholder for icon */}
                <div className="w-full h-full border border-current rounded-md flex items-center justify-center">
                  <span className="text-xs">{item.icon[0].toUpperCase()}</span>
                </div>
              </div>
              <span className={`${index === 0 ? "font-medium" : ""}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
