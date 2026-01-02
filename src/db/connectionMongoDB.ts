import { MONGO_URL } from "../config/dotenv.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const getConnection = async () => {
  try {
    if (!MONGO_URL) throw new Error("MONGO_URL is not defined");
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error connecting to db", error);
    process.exit(1);
  }
};

export { getConnection };
