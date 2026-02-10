const mongoose = require("mongoose");

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDb connection failed.", err);
    // In serverless, we don't want to exit the process as it kills the container
    // allowing cold starts to retry connectivity might be better
  }
};

module.exports = connectDB;
