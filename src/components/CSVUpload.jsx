import React from "react";

const CSVUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Upload CSV File</h2>
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csvInput"
          />
          <label
            htmlFor="csvInput"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors"
          >
            Select CSV File
          </label>
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;
