import React from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import CSVUpload from "../components/CSVUpload";

const UploadPage = () => {
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    // Store the file data in localStorage after processing
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const validData = results.data.filter((row) => {
            return (
              row.sales &&
              row.profit &&
              row.malfunctions &&
              row.tank_level &&
              row.Diesel &&
              row.AdBlue &&
              row.SuperE5 &&
              row.SuperE10 &&
              row.Cleaning &&
              !isNaN(parseFloat(row.sales)) &&
              !isNaN(parseFloat(row.profit)) &&
              !isNaN(parseInt(row.malfunctions)) &&
              !isNaN(parseFloat(row.tank_level)) &&
              !isNaN(parseFloat(row.Diesel)) &&
              !isNaN(parseFloat(row.AdBlue)) &&
              !isNaN(parseFloat(row.SuperE5)) &&
              !isNaN(parseFloat(row.SuperE10)) &&
              !isNaN(parseFloat(row.Cleaning))
            );
          });

          if (validData.length === 0) {
            throw new Error("No valid data found in the CSV file");
          }

          // Store the processed data in localStorage
          localStorage.setItem("dashboardData", JSON.stringify(validData));

          // Navigate back to dashboard
          navigate("/");
        } catch (error) {
          console.error("Error processing CSV data:", error);
          alert(
            "Error processing CSV file. Please check if the file has all required columns and valid numbers."
          );
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        alert("Error parsing CSV file. Please check the file format.");
      },
    });
  };

  return (
    <div className="max-w-[95%] mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Upload Dashboard Data</h1>
        <CSVUpload onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default UploadPage;
