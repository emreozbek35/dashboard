import React, { useState, useEffect } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Check screen width on mount and when window resizes
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: "grid" },
    { name: "Sales", icon: "dollar-sign" },
    { name: "Inventory", icon: "package" },
    { name: "Customers", icon: "users" },
    { name: "Reports", icon: "bar-chart-2" },
    { name: "Settings", icon: "settings" },
  ];

  return (
    <div
      className={`bg-white shadow-sm h-screen flex-shrink-0 overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className={`${collapsed ? "p-3" : "p-5"}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          {!collapsed && <span className="font-semibold">Dashboard</span>}
        </div>

        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                collapsed ? "justify-center" : "px-4"
              } py-3 rounded-lg cursor-pointer ${
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
              {!collapsed && (
                <span className={`${index === 0 ? "font-medium" : ""}`}>
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {collapsed ? "→" : "←"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
