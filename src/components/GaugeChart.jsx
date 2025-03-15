import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GaugeChart = ({ value = 65 }) => {
  const COLORS = ["#F87171", "#FCA5A5", "#FACC15", "#4ADE80"];
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
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full" style={{ height: "180px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={5} // Smooth gap
                cornerRadius={20} // Rounded arcs
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-4xl font-bold mt-2">{value}%</div>
        <p className="text-gray-500 text-lg">Tank #1's fill rate is</p>
        <p className="text-gray-400 text-sm">Updated Mar 24, 2025</p>
      </div>
    </div>
  );
};

export default GaugeChart;
