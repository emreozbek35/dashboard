import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    uploadId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    malfunctions: {
      type: Number,
      required: true,
    },
    gas_type: {
      type: String,
      required: true,
    },
    tank_level: {
      type: Number,
      required: true,
    },
    gas_price: {
      type: Number,
      required: true,
    },
    Diesel: {
      type: Number,
      required: true,
    },
    AdBlue: {
      type: Number,
      required: true,
    },
    SuperE5: {
      type: Number,
      required: true,
    },
    SuperE10: {
      type: Number,
      required: true,
    },
    Cleaning: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);
export default Data;
