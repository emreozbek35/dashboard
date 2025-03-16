import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const colors = {
  Diesel: "#962dff",
  AdBlue: "#4a3aff",
  SuperE5: "#e0c6fd",
  SuperE10: "#93aafd",
  Cleaning: "#BFDBFE",
};

const calculatePercentages = (data) => {
  if (!data || data.length === 0) return [];

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const categories = ["Diesel", "AdBlue", "SuperE5", "SuperE10", "Cleaning"];
  const total = categories.reduce(
    (sum, category) => sum + parseFloat(latest[category] || 0),
    0
  );

  return categories.map((category) => {
    const value = (parseFloat(latest[category] || 0) / total) * 100;
    const prevValue = previous
      ? (parseFloat(previous[category] || 0) /
          categories.reduce(
            (sum, cat) => sum + parseFloat(previous[cat] || 0),
            0
          )) *
        100
      : value;
    const change = ((value - prevValue) / prevValue) * 100;

    return {
      name: category,
      value: parseFloat(value.toFixed(2)),
      color: colors[category],
      change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
    };
  });
};

const TotalSalesByGasType = ({ data }) => {
  const chartData = calculatePercentages(data);

  return (
    <div
      className="p-3 lg:p-4 shadow-md rounded-lg flex-1 bg-white min-w-[280px]"
      style={{ height: "fit-content" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 lg:mb-4 gap-2">
        <div>
          <p className="text-[#9291a5] text-xs md:text-sm">Statistics</p>
          <h3 className="text-lg md:text-xl font-bold">
            Total Sales by Gas Type
          </h3>
        </div>
        <div className="relative">
          <select className="appearance-none text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-2 pr-10 md:pr-12 rounded-md bg-white border border-gray-200 text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-colors cursor-pointer shadow-sm">
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Divider border below title */}
      <div className="border-b border-gray-200 my-2 lg:my-3"></div>

      <div className="flex flex-col lg:flex-row items-center mt-3 lg:mt-4">
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 mt-2 lg:mt-0 lg:ml-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-1 md:gap-2 mb-1 md:mb-2 items-center text-xs md:text-sm"
            >
              <div className="flex items-center gap-1 md:gap-2 col-span-6">
                <span
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-medium truncate">{item.name}</span>
              </div>
              <div className="text-right font-normal text-[#8b88a4] col-span-3">
                {item.value}%
              </div>
              <div
                className={`col-span-3 ${
                  item.change.startsWith("+")
                    ? "text-[#04ce00] font-semibold text-right"
                    : "text-[#ff718b] font-semibold text-right"
                }`}
              >
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalSalesByGasType;
