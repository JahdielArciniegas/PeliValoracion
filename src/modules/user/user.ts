import type { Types } from "mongoose";

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  coupleId: string | Types.ObjectId;
}

export type UserUpdate = Omit<User, "password">;
