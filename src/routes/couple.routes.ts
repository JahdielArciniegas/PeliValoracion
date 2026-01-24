import { coupleControllers } from "../controllers/couple.controller.js";
import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  coupleCreateSchema,
  coupleValidateSchema,
  coupleChangeNameSchema,
  coupleRemoveSchema,
} from "../schemas/couple.js";

const coupleRouter = express.Router();

coupleRouter.post(
  "/getCode",
  validateRequest(coupleCreateSchema),
  coupleControllers.getCoupleCode,
);
coupleRouter.put(
  "/validate",
  validateRequest(coupleValidateSchema),
  coupleControllers.validateCouple,
);
coupleRouter.put(
  "/:id",
  validateRequest(coupleChangeNameSchema),
  coupleControllers.changeName,
);
coupleRouter.get("/:id", coupleControllers.getOneCouple);
coupleRouter.delete(
  "/:id",
  validateRequest(coupleRemoveSchema),
  coupleControllers.removeCouple,
);

export default coupleRouter;
