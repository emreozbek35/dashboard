import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
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
  Diesel: "#962dff",
  AdBlue: "#4a3aff",
  SuperE5: "#e0c6fd",
  SuperE10: "#93aafd",
  Cleaning: "#BFDBFE",
};

const SalesChart = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const CategorySelector = () => (
    <div className="flex flex-col gap-4">
      <button
        className={`max-w-fit px-2 flex items-center gap-2 py-2 border-1 rounded-full ${
          selectedCategory === "All"
            ? "border-[#4a3aff] text-[#4a3aff] font-bold"
            : "border-gray-400 text-gray-600"
        }`}
        onClick={() => setSelectedCategory("All")}
      >
        <span className="w-3 h-3 bg-[#4a3aff] rounded-full"></span> All
        Categories
      </button>
      <div className="flex flex-col gap-3">
        {Object.keys(colors).map((category) => (
          <button
            key={category}
            className={`flex px-2 items-center gap-2 text-sm ${
              selectedCategory === category
                ? "text-[#4a3aff] font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <span
              className="w-3 h-3 rounded-full"
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
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
      {/* Main content container - flex column on mobile, row on larger screens */}
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Chart section - full width on mobile, 3/4 on larger screens */}
        <div className="w-full lg:w-3/4 lg:border-r lg:border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
            <div className="mb-3 sm:mb-0">
              <p className="text-gray-400 text-sm">Statistics</p>
              <h2 className="text-xl font-bold">Total summary of sales</h2>
            </div>

            {/* Period selector - hidden on mobile, visible on md screens and up */}
            <div className="hidden md:flex bg-gray-100 p-2 rounded-xl">
              {["Daily", "Weekly", "Monthly"].map((period) => (
                <button
                  key={period}
                  className={`px-4 py-1 text-sm rounded-lg cursor-pointer ${
                    period === selectedPeriod
                      ? "bg-black text-white"
                      : "text-gray-600"
                  }`}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="5 5" vertical={false} />
              <XAxis
                style={{
                  fill: "#615e83",
                }}
                dataKey="day"
                tick={{ fill: "#615e83", dy: 10 }}
                tickMargin={5}
                tickLine={false}
                axisLine={{ stroke: "#e5e5ef" }}
              />
              <YAxis
                tickFormatter={(value) => {
                  if (value === 0) {
                    return "0";
                  }
                  if (value >= 1000000) {
                    const millions = value / 1000000;
                    return millions % 1 === 0
                      ? `${Math.floor(millions)}M`
                      : `${millions.toFixed(1)}M`;
                  }
                  return `${value / 1000}k`;
                }}
                axisLine={false}
                tick={{ fill: "#615e83" }}
                tickMargin={10}
                tickLine={false}
              />
              <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
              {Object.keys(colors).map((key) =>
                selectedCategory === "All" || selectedCategory === key ? (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[key]}
                    barSize={12}
                    radius={[5, 5, 0, 0]}
                  />
                ) : null
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category selector - hidden on mobile in this position */}
        <div className="hidden lg:flex lg:w-1/4 lg:flex-col lg:gap-4 lg:self-center lg:pl-4">
          <CategorySelector />
        </div>
      </div>

      {/* Category selector below chart on mobile and small screens */}
      <div className="mt-6 lg:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <CategorySelector />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
