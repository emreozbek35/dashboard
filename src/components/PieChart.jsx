import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Diesel", value: 39.11, color: "#3b82f6", change: "+2.98%" },
  { name: "Ad Blue", value: 28.02, color: "#6366f1", change: "-3.25%" },
  { name: "Super E5", value: 23.13, color: "#818cf8", change: "+0.14%" },
  { name: "Super E10", value: 5.03, color: "#c7d2fe", change: "-1.11%" },
];

const TotalSalesByGasType = () => {
  return (
    <div className="p-4 shadow-md rounded-lg flex-1 bg-white">
      <h2 className="text-gray-500 text-sm">Statistics</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Total Sales by Gas Type</h3>
        <select className="text-sm border rounded px-2 py-1 bg-gray-100">
          <option value="March">March</option>
        </select>
      </div>
      <div className="flex items-center mt-4">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="ml-4 text-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.name}</span>
              <span className="font-bold">{item.value}%</span>
              <span
                className={
                  item.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalSalesByGasType;
