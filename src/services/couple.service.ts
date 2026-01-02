import { coupleRepositories } from "../repositories/couple.repositories.js";
import type { Couple } from "../interfaces/couple.js";
import { userRepositories } from "../repositories/user.repositories.js";

const createAndAddUser = async (id: string) => {
  const user = await userRepositories.getOneById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const couple = await coupleRepositories.create(id);
  user.coupleId = couple._id;
  await userRepositories.update(user);
  return couple;
};

const validateCouple = async (id: string, userId: string) => {
  const user = await userRepositories.getOneById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const couple = await coupleRepositories.getOne(id);
  if (!couple) {
    throw new Error("Couple not found");
  }

  if (couple.users.length === 2) {
    throw new Error("Couple is full");
  }
  const validatedCouple = {
    name: couple.name,
    users: [couple.users[0], userId],
  };
  const newCouple = await coupleRepositories.update(
    id,
    validatedCouple as Couple
  );

  if (!newCouple) throw new Error("Error Validated");
  user.coupleId = newCouple._id;
  await userRepositories.update(user);
  return newCouple;
};

const changeName = async (id: string, couple: Couple) => {
  if (couple.name === null || couple.name === undefined) {
    throw new Error("Couple name is required");
  }
  if ((couple.name as string).length < 3) {
    throw new Error("Couple name must be at least 3 characters long");
  }
  const updatedCouple = await coupleRepositories.update(id, couple);
  return updatedCouple;
};

const removeCouple = async (id: string) => {
  const couple = await coupleRepositories.remove(id);
  return couple;
};

const getOneCouple = async (id: string) => {
  const couple = await coupleRepositories.getOne(id);
  return couple;
};

export const coupleServices = {
  createAndAddUser,
  validateCouple,
  changeName,
  removeCouple,
  getOneCouple,
};
