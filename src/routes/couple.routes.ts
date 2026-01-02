import { coupleControllers } from "../controllers/couple.controller.js";
import express from "express";

const coupleRouter = express.Router();

coupleRouter.post("/getCode", coupleControllers.createCouple);
coupleRouter.put("/validate", coupleControllers.validateCouple);
coupleRouter.put("/:id", coupleControllers.changeName);
coupleRouter.get("/:id", coupleControllers.getOneCouple);
coupleRouter.delete("/:id", coupleControllers.removeCouple);

export default coupleRouter;
