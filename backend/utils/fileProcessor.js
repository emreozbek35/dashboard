import fs from "fs";
import csv from "csv-parser";
import xlsx from "xlsx";
import Data from "../models/Data.js";

export const processFile = async (file) => {
  const fileExtension = file.originalname.split(".").pop().toLowerCase();

  if (fileExtension === "csv") {
    return processCsvFile(file.path);
  } else if (fileExtension === "xlsx" || fileExtension === "xls") {
    return processExcelFile(file.path);
  } else {
    throw new Error("Unsupported file format");
  }
};

const processCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(transformData(data));
      })
      .on("end", async () => {
        try {
          // Delete the temporary file
          fs.unlinkSync(filePath);
          // Save all records to database
          const savedData = await Data.insertMany(results);
          resolve(savedData);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const processExcelFile = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  const transformedData = data.map(transformData);

  // Delete the temporary file
  fs.unlinkSync(filePath);

  // Save all records to database
  return Data.insertMany(transformedData);
};

const transformData = (row) => {
  return {
    date: new Date(row.date),
    day: row.day,
    sales: parseFloat(row.sales),
    profit: parseFloat(row.profit),
    malfunctions: parseInt(row.malfunctions),
    gas_type: row.gas_type,
    tank_level: parseFloat(row.tank_level),
    gas_price: parseFloat(row.gas_price),
    Diesel: parseFloat(row.Diesel),
    AdBlue: parseFloat(row.AdBlue),
    SuperE5: parseFloat(row.SuperE5),
    SuperE10: parseFloat(row.SuperE10),
    Cleaning: parseFloat(row.Cleaning),
  };
};
