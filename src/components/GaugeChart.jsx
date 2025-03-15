import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const GaugeChart = ({ value }) => {
  const COLORS = ["#F87171", "#FCA5A5", "#FACC15", "#4ADE80"];
  const data = [
    { value: 30 }, // Red
    { value: 15 }, // Light Red
    { value: 15 }, // Yellow
    { value: 40 }, // Green
  ];

  const needleValue = (value / 100) * 180; // Convert percentage to degrees

  return (
    <div className="flex flex-col items-center">
      <PieChart width={200} height={120}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5} // Smooth gap
          cornerRadius={20} // Rounded arcs
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-3xl font-bold">{value}%</div>
      <p className="text-gray-500">Tank #1’s fill rate is</p>
      <p className="text-gray-400 text-sm">Updated Mar 24, 2025</p>
    </div>
  );
};

export default GaugeChart;
