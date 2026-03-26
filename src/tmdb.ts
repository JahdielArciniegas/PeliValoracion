import { TMDB } from "@leandrowkz/tmdb";
import { API_KEY } from "./config/dotenv.js";

if (API_KEY === undefined) throw new Error("API_KEY is not defined");
export const tmdb = new TMDB({ apiKey: API_KEY });
