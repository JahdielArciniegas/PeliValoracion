import type { Types } from "mongoose";

export interface Couple {
  id?: string
  name?: string & undefined;
  users: string[];
  movies: (string | Types.ObjectId)[];
}
