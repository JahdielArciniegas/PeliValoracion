import dotenv from "dotenv";

dotenv.config();
export const { API_KEY, MONGO_URL, JWT_SECRET } = process.env;
