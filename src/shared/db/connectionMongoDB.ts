/* eslint-disable @typescript-eslint/no-explicit-any */
import { MONGO_URL } from '../config/dotenv.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

if (!MONGO_URL) {
  throw new Error('Por favor, define la variable MONGO_URL')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}
async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
    cached.promise = mongoose
      .connect(MONGO_URL as string, options)
      .then((mongoose) => {
        console.log('MongoDB conectado')
        return mongoose.connect
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default dbConnect
