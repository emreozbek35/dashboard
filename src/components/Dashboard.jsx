import React from "react";
import StatCard from "./StatCard";
import { salesData, profitData, malfunctionData } from "../data/mockData";
import SalesChart from "./SalesChart";
import GaugeChart from "./GaugeChart";
import TotalSalesByGasType from "./PieChart";
const Dashboard = () => {
  return (
    <div className="max-w-[95%] mx-auto flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-4 w-full">
        <StatCard
          title="Total Sales Today"
          value="$6035"
          percentage={21.01}
          data={salesData}
          color="#2563eb"
          className="flex-1 min-w-[250px]"
        />
        <StatCard
          title="Total Profit Today"
          value="$325"
          percentage={18.34}
          data={profitData}
          color="#04ce00"
          className="flex-1 min-w-[250px]"
        />
        <StatCard
          title="Malfunctions Today"
          value="5"
          percentage={-7.69}
          data={malfunctionData}
          color="#ff718b"
          className="flex-1 min-w-[250px]"
        />
      </div>
      <SalesChart />
      <div className="flex flex-wrap gap-4">
        <GaugeChart />
        <TotalSalesByGasType />
      </div>
    </div>
  );
};

export default Dashboard;
