import { TMDB } from "@lorenzopant/tmdb";
import { API_KEY } from "./config/dotenv.js";

if (API_KEY === undefined) throw new Error("API_KEY is not defined");
export const tmdb = new TMDB(API_KEY);
