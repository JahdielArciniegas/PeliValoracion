import type { Types } from "mongoose";

export interface User {
  id?: any;
  name: string;
  email: string;
  password: string;
  coupleId: string | Types.ObjectId;
}

export type UserUpdate = Omit<User, "password">;
