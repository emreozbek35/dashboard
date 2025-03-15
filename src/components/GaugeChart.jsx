import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GaugeChart = ({ value = 65 }) => {
  const COLORS = ["#ff718b", "#FCA5A5", "#FACC15", "#04ce00"];
  const data = [
    { value: 30 }, // Red
    { value: 15 }, // Light Red
    { value: 15 }, // Yellow
    { value: 40 }, // Green
  ];

  // Keep this line to avoid linter error, but we're not using it yet
  // const needleValue = (value / 100) * 180; // Convert percentage to degrees

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex-1 min-w-[280px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[#9291a5] text-sm">Tanks</p>
          <h2 className="text-xl font-bold">Tank #1</h2>
        </div>
        <div className="relative">
          <select className="appearance-none text-sm font-medium px-4 py-2 pr-8 rounded-md bg-white border border-gray-200 text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-colors cursor-pointer shadow-sm">
            <option value="Tank #1">Tank #1</option>
            <option value="Tank #2">Tank #2</option>
            <option value="Tank #3">Tank #3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Divider border below title */}
      <div className="border-b border-gray-200 mb-4"></div>

      <div className="flex flex-col items-center">
        <div className="w-full relative" style={{ height: "500px" }}>
          <ResponsiveContainer
            style={{
              userSelect: "none",
              pointerEvents: "none",
            }}
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="70%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={1} // Smooth gap
                cornerRadius={100} // Rounded arcs
                dataKey="value"
                strokeWidth={10}
              >
                {data.map((_, index) => (
                  <Cell scale={100} key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Positioned value display inside the chart */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ top: "40%" }}
          >
            <div className="text-6xl font-bold">{value}%</div>
          </div>
        </div>

        <p className="text-[#1e1b39] font-bold text-lg mt-2">
          Tank #1's fill rate is
        </p>
        <p className="text-[#615e83] text-sm">Updated Mar 24, 2025</p>
      </div>
    </div>
  );
};

export default GaugeChart;
