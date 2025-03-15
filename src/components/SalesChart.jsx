import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    day: "MON",
    Diesel: 1000000,
    AdBlue: 500000,
    SuperE5: 250000,
    SuperE10: 150000,
    Cleaning: 50000,
  },
  {
    day: "TUE",
    Diesel: 500000,
    AdBlue: 200000,
    SuperE5: 150000,
    SuperE10: 100000,
    Cleaning: 20000,
  },
  {
    day: "WED",
    Diesel: 800000,
    AdBlue: 600000,
    SuperE5: 400000,
    SuperE10: 200000,
    Cleaning: 100000,
  },
  {
    day: "THU",
    Diesel: 400000,
    AdBlue: 150000,
    SuperE5: 200000,
    SuperE10: 100000,
    Cleaning: 50000,
  },
  {
    day: "FRI",
    Diesel: 100000,
    AdBlue: 50000,
    SuperE5: 75000,
    SuperE10: 25000,
    Cleaning: 10000,
  },
  {
    day: "SAT",
    Diesel: 700000,
    AdBlue: 500000,
    SuperE5: 300000,
    SuperE10: 200000,
    Cleaning: 75000,
  },
  {
    day: "SUN",
    Diesel: 900000,
    AdBlue: 600000,
    SuperE5: 400000,
    SuperE10: 250000,
    Cleaning: 100000,
  },
];

const colors = {
  Diesel: "#A855F7",
  AdBlue: "#6366F1",
  SuperE5: "#C4B5FD",
  SuperE10: "#818CF8",
  Cleaning: "#BFDBFE",
};

const SalesChart = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-400 text-sm">Statistics</p>
          <h2 className="text-xl font-bold">Total summary of sales</h2>
        </div>
        <div className="bg-gray-100 p-1 rounded-xl flex">
          {["Daily", "Weekly", "Monthly"].map((period) => (
            <button
              key={period}
              className={`px-4 py-1 text-sm rounded-lg ${
                period === "Weekly" ? "bg-black text-white" : "text-gray-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          {Object.keys(colors).map((key) =>
            selectedCategory === "All" || selectedCategory === key ? (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[key]}
                barSize={20}
                radius={[5, 5, 0, 0]}
              />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* Category Selector */}
      <div className="mt-4 flex gap-6 items-center">
        <button
          className={`flex items-center gap-2 px-4 py-1 border rounded-full ${
            selectedCategory === "All"
              ? "border-blue-500 text-blue-500 font-bold"
              : "border-gray-300 text-gray-600"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span> All
          Categories
        </button>
        <div className="flex flex-wrap gap-4">
          {Object.keys(colors).map((category) => (
            <button
              key={category}
              className={`flex items-center gap-2 text-sm ${
                selectedCategory === category
                  ? "text-blue-500 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: colors[category] }}
              ></span>
              {category} -{" "}
              {Math.floor(
                (data.reduce((sum, d) => sum + d[category], 0) /
                  data.length /
                  1000000) *
                  100
              )}
              %
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
