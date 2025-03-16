import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import GaugeChart from "./GaugeChart";
import TotalSalesByGasType from "./PieChart";
import { fetchDashboardData, fetchSummaryStats } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading: isLoadingData,
    error: dataError,
  } = useQuery({
    queryKey: ["dashboardData", dateRange],
    queryFn: () => fetchDashboardData(dateRange),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });

  // Fetch summary statistics
  const {
    data: summaryStats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["summaryStats"],
    queryFn: fetchSummaryStats,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Handle errors
  React.useEffect(() => {
    if (dataError) {
      notifications.show({
        title: "Error",
        message:
          dataError.response?.data?.message || "Failed to fetch dashboard data",
        color: "red",
      });
    }
    if (statsError) {
      notifications.show({
        title: "Error",
        message:
          statsError.response?.data?.message ||
          "Failed to fetch summary statistics",
        color: "red",
      });
    }
  }, [dataError, statsError]);

  const transformedData = dashboardData
    ? {
        salesData: dashboardData.map((row) => ({
          value: parseFloat(row.sales) || 0,
        })),
        profitData: dashboardData.map((row) => ({
          value: parseFloat(row.profit) || 0,
        })),
        malfunctionData: dashboardData.map((row) => ({
          value: parseInt(row.malfunctions) || 0,
        })),
        latestData: dashboardData[dashboardData.length - 1],
        tankLevel:
          parseFloat(dashboardData[dashboardData.length - 1]?.tank_level) || 0,
        chartData: dashboardData.map((row) => ({
          ...row,
          Diesel: parseFloat(row.Diesel) || 0,
          AdBlue: parseFloat(row.AdBlue) || 0,
          SuperE5: parseFloat(row.SuperE5) || 0,
          SuperE10: parseFloat(row.SuperE10) || 0,
          Cleaning: parseFloat(row.Cleaning) || 0,
          sales: parseFloat(row.sales) || 0,
          profit: parseFloat(row.profit) || 0,
          malfunctions: parseInt(row.malfunctions) || 0,
          tank_level: parseFloat(row.tank_level) || 0,
        })),
      }
    : null;

  if (isLoadingData || isLoadingStats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const hasData = dashboardData?.length > 0;

  return (
    <div className="max-w-[95%] mx-auto flex flex-col gap-4 p-4">
      {hasData ? (
        <>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => navigate("/excel-upload")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Upload New Data
            </button>
          </div>
          <div className="flex flex-wrap gap-4 w-full">
            <StatCard
              title="Total Sales Today"
              value={`$${transformedData.latestData?.sales || 0}`}
              percentage={summaryStats?.salesGrowth || 0}
              data={transformedData.salesData}
              color="#2563eb"
              className="flex-1 min-w-[250px]"
            />
            <StatCard
              title="Total Profit Today"
              value={`$${transformedData.latestData?.profit || 0}`}
              percentage={summaryStats?.profitGrowth || 0}
              data={transformedData.profitData}
              color="#04ce00"
              className="flex-1 min-w-[250px]"
            />
            <StatCard
              title="Malfunctions Today"
              value={transformedData.latestData?.malfunctions || 0}
              percentage={summaryStats?.malfunctionsChange || 0}
              data={transformedData.malfunctionData}
              color="#ff718b"
              className="flex-1 min-w-[250px]"
            />
          </div>
          <SalesChart data={transformedData.chartData} />
          <div className="flex flex-wrap gap-4">
            <GaugeChart value={transformedData.tankLevel} />
            <TotalSalesByGasType data={transformedData.chartData} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
          <p className="text-xl text-gray-600">No dashboard data available</p>
          <button
            onClick={() => navigate("/excel-upload")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Upload Data
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
