import React from "react";
import StatCard from "./StatCard";
import { salesData, profitData, malfunctionData } from "../data/mockData";
import SalesChart from "./SalesChart";
import GaugeChart from "./GaugeChart";
import TotalSalesByGasType from "./PieChart";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <StatCard
          title="Total Sales Today"
          value="$6035"
          percentage={21.01}
          data={salesData}
          color="#2563eb"
        />
        <StatCard
          title="Total Profit Today"
          value="$325"
          percentage={18.34}
          data={profitData}
          color="#22c55e"
        />
        <StatCard
          title="Malfunctions Today"
          value="5"
          percentage={-7.69}
          data={malfunctionData}
          color="#ef4444"
        />
      </div>
      <SalesChart />
      <GaugeChart />
      <TotalSalesByGasType />
    </div>
  );
};

export default Dashboard;
