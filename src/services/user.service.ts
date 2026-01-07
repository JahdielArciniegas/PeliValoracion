import type { User } from "../interfaces/user.js";
import { userRepositories } from "../repositories/user.repositories.js";
import { ValidationError, NotFoundError } from "../utils/errorHandler.js";

const create = async (name: string, email: string) => {
  if (!name || !email)
    throw new ValidationError("User name and email are required");
  const coupleId = "";
  const userExist = await userRepositories.getOneByEmail(email);
  if (userExist) throw new ValidationError("User already exists");
  const newUser: User = {
    name: name,
    email: email,
    coupleId: coupleId,
  };
  const userCreate = await userRepositories.create(newUser);
  return userCreate;
};

const getOne = async (email: string) => {
  if (!email) throw new ValidationError("Email is required");
  const user = await userRepositories.getOneByEmail(email);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

const update = async (id: string, user: User) => {
  if (!user.email) throw new ValidationError("Email is required");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  if (!user.name) throw new ValidationError("User name is required");
  const coupleId = user.coupleId || userExist.coupleId;
  const newUser: User = {
    name: user.name,
    email: user.email,
    coupleId: coupleId,
  };
  const userUpdate = await userRepositories.update(newUser);
  return userUpdate;
};

const remove = async (id: string) => {
  if (!id) throw new ValidationError("Id is required");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  const userRemove = await userRepositories.remove(id);
  return userRemove;
};

export const userService = { create, getOne, update, remove };
