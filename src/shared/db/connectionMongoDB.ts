import { MONGO_URL } from "../config/dotenv.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

if (!MONGO_URL) {
  throw new Error('Por favor, define la variable MONGO_URL en Vercel');
}

// Para evitar que se quede colgado 300 segundos si falla
const options = {
  serverSelectionTimeoutMS: 5000, // Si en 5s no conecta, falla.
};

async function dbConnect() {
  // Si ya hay una conexión, no creamos otra
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_URL as string, options);
}

export default dbConnect;
