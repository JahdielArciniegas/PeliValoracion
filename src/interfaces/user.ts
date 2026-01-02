import type { Types } from "mongoose";

export interface User {
  id?: any;
  name: string;
  email: string;
  coupleId: string | Types.ObjectId;
}
