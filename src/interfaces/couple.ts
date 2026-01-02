import type { Types } from "mongoose";

export interface Couple {
  id?: any;
  name?: string & undefined;
  users: string[];
}
