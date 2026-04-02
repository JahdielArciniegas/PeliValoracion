import { coupleRepositories } from "./couple.repositories.js";
import type { Couple } from "./couple.js";
import { userRepositories } from "../user/user.repositories.js";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../../shared/utils/errors.js";
import dbConnect from "../../shared/db/connectionMongoDB.js";

const getCode = async (id: string) => {
  await dbConnect();
  const user = await userRepositories.getOneById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (user.coupleId) {
    const coupleExist = await coupleRepositories.getOne(
      user.coupleId.toString()
    );
    if (coupleExist?.users.length === 2) {
      throw new ValidationError("User already has a couple");
    }
    return coupleExist;
  }

  const couple = await coupleRepositories.create(id);
  user.coupleId = couple._id;
  await userRepositories.update(user);
  return couple;
};

const validateCouple = async (id: string, userId: string) => {
  await dbConnect();
  const user = await userRepositories.getOneById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const couple = await coupleRepositories.getOne(id);
  if (!couple) {
    throw new NotFoundError("Couple not found");
  }

  if (couple.users.length === 2) {
    throw new ValidationError("Couple is full");
  }
  const validatedCouple = {
    name: couple.name,
    users: [couple.users[0], userId],
  };
  const newCouple = await coupleRepositories.update(
    id,
    validatedCouple as Couple
  );

  if (!newCouple) throw new InternalServerError("Error updating couple");
  user.coupleId = newCouple._id;
  await userRepositories.update(user);
  return newCouple;
};

const changeName = async (id: string, couple: Couple) => {
  await dbConnect();
  if (couple.name === null || couple.name === undefined) {
    throw new ValidationError("Couple name is required");
  }
  if ((couple.name as string).length < 3) {
    throw new ValidationError("Couple name must be at least 3 characters long");
  }
  const updatedCouple = await coupleRepositories.update(id, couple);
  return updatedCouple;
};

const removeCouple = async (id: string) => {
  await dbConnect();
  const couple = await coupleRepositories.remove(id);
  return couple;
};

const getOneCouple = async (id: string) => {
  await dbConnect();
  const couple = await coupleRepositories.getOne(id);
  return couple;
};

export const coupleServices = {
  getCode,
  validateCouple,
  changeName,
  removeCouple,
  getOneCouple,
};
