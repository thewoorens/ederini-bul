import mongoose from "mongoose";

const config = useRuntimeConfig();

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(
      config.MONGO_URI || (process.env.MONGO_URI as string),
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
