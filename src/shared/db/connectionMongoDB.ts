import { MONGO_URL } from '../config/dotenv.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

if (!MONGO_URL) {
  throw new Error('Por favor, define la variable MONGO_URL en Vercel')
}

const options = {
  serverSelectionTimeoutMS: 5000,
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return

  return mongoose.connect(MONGO_URL as string, options)
}

export default dbConnect
