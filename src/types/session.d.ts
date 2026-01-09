import * as express from "express";

export interface UserData {
  id: string;
  name: string;
  idCouple: string;
}

declare global {
  namespace Express {
    interface Request {
      session: {
        user?: UserData | null;
      };
    }
  }
}
