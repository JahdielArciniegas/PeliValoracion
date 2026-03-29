import { Redis } from "@upstash/redis";
import { REDIS_URL, REDIS_TOKEN } from "./dotenv.js";

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error("REDIS_URL or REDIS_TOKEN is not defined");
}

const redisClient = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export default redisClient;

