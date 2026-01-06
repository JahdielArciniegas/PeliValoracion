import type { ObjectId } from "mongoose";

export interface Couple {
  id?: any;
  name?: string & undefined;
  users: string[];
  movies: any[];
}
