import dotenv from "dotenv";

dotenv.config();
export const { API_KEY, MONGO_URL, JWT_SECRET, REDIS_TOKEN, REDIS_URL } = process.env;
