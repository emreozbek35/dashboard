import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Data from "../models/Data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: join(__dirname, "..", ".env") });

const testData = [
  {
    date: new Date("2024-03-15"),
    day: "FRI",
    sales: 1200,
    profit: 350,
    malfunctions: 1,
    gas_type: "Regular",
    tank_level: 75,
    gas_price: 3.55,
    Diesel: 800000,
    AdBlue: 400000,
    SuperE5: 300000,
    SuperE10: 200000,
    Cleaning: 50000,
  },
  {
    date: new Date("2024-03-16"),
    day: "SAT",
    sales: 1500,
    profit: 420,
    malfunctions: 0,
    gas_type: "Regular",
    tank_level: 70,
    gas_price: 3.55,
    Diesel: 900000,
    AdBlue: 450000,
    SuperE5: 350000,
    SuperE10: 250000,
    Cleaning: 60000,
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Data.deleteMany({});
    console.log("Cleared existing data");

    // Insert test data
    const result = await Data.insertMany(testData);
    console.log(`Inserted ${result.length} documents`);

    // Fetch and display the inserted data
    const fetchedData = await Data.find();
    console.log("Inserted data:", fetchedData);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run the seed function
seedData();
