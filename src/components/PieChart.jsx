import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Diesel", value: 39.11, color: "#3b82f6", change: "+2.98%" },
  { name: "Ad Blue", value: 28.02, color: "#6366f1", change: "-3.25%" },
  { name: "Super E5", value: 23.13, color: "#818cf8", change: "+0.14%" },
  { name: "Super E10", value: 5.03, color: "#c7d2fe", change: "-1.11%" },
];

const TotalSalesByGasType = () => {
  return (
    <div className="p-4 shadow-md rounded-lg flex-1 bg-white min-w-[280px]">
      <h2 className="text-[#9291a5] text-sm">Statistics</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Total Sales by Gas Type</h3>
        <select className="text-sm border rounded px-2 py-1 bg-gray-100">
          <option value="March">March</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row items-center mt-4">
        <div className="w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mb-2 items-center"
            >
              <div className="flex items-center gap-2 col-span-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-right font-normal text-[#8b88a4]">
                {item.value}%
              </div>
              <div
                className={
                  item.change.startsWith("+")
                    ? "text-[#04ce00] font-semibold text-right"
                    : "text-[#ff718b] font-semibold text-right"
                }
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
