import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatCard = ({
  title,
  value,
  percentage,
  data,
  color,
  className = "",
}) => {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow-md ${className}`}>
      <p className="text-[#9291a5] text-sm">Statistics</p>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <p
        className={`text-sm font-semibold ${
          percentage > 0 ? "text-[#04ce00]" : "text-[#ff718b]"
        }`}
      >
        {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
      </p>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatCard;
