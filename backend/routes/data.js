import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import xlsx from "xlsx";
import Data from "../models/Data.js";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "text/csv"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel and CSV files are allowed"));
    }
  },
});

// Get latest upload ID
const getLatestUploadId = async () => {
  const latestData = await Data.findOne().sort({ createdAt: -1 });
  return latestData?.uploadId;
};

// Get all data with optional date range filtering
router.get("/data", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const latestUploadId = await getLatestUploadId();

    if (!latestUploadId) {
      return res.json([]);
    }

    let query = { uploadId: latestUploadId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await Data.find(query).sort({ date: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get summary statistics
router.get("/stats", async (req, res) => {
  try {
    const latestUploadId = await getLatestUploadId();

    if (!latestUploadId) {
      return res.json({
        salesGrowth: 0,
        profitGrowth: 0,
        malfunctionsChange: 0,
      });
    }

    const data = await Data.find({ uploadId: latestUploadId }).sort({
      date: 1,
    });

    if (data.length < 2) {
      return res.json({
        salesGrowth: 0,
        profitGrowth: 0,
        malfunctionsChange: 0,
      });
    }

    const latest = data[data.length - 1];
    const previous = data[data.length - 2];

    const salesGrowth =
      ((latest.sales - previous.sales) / previous.sales) * 100;
    const profitGrowth =
      ((latest.profit - previous.profit) / previous.profit) * 100;
    const malfunctionsChange =
      ((latest.malfunctions - previous.malfunctions) /
        (previous.malfunctions || 1)) *
      100;

    res.json({
      salesGrowth: parseFloat(salesGrowth.toFixed(2)),
      profitGrowth: parseFloat(profitGrowth.toFixed(2)),
      malfunctionsChange: parseFloat(malfunctionsChange.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Generate a unique upload ID
    const uploadId = Date.now().toString();

    const transformedData = jsonData.map((row) => ({
      uploadId,
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
    }));

    await Data.insertMany(transformedData);

    // Delete the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded successfully",
      count: transformedData.length,
      uploadId,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
