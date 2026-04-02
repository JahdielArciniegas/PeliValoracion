import type { User, UserUpdate } from "./user.js";
import { userRepositories } from "./user.repositories.js";
import bcrypt from "bcrypt";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../../shared/utils/errors.js";
import dbConnect from "../../shared/db/connectionMongoDB.js";

const create = async (
  name: string,
  email: string,
  password: string,
) => {
  await dbConnect();
  if (!name || !email || !password)
    throw new ValidationError("User name, email and password are required");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const emailLower = email.toLowerCase();

  const coupleId = "";
  const userExist = await userRepositories.getOneByEmail(emailLower);
  if (userExist) throw new ValidationError("User already exists");
  const newUser: User = {
    name: name,
    email: emailLower,
    coupleId: coupleId,
    password: hashedPassword,
  };
  const userCreate = await userRepositories.create(newUser);
  return userCreate;
};

const getOne = async (id: string | undefined) => {
  await dbConnect();
  if (!id) throw new ValidationError("User id is required");
  const user = await userRepositories.getOneById(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

const update = async (id: string | undefined, user: UserUpdate) => {
  await dbConnect();
  if (!id) throw new UnauthorizedError("Id is required for update");
  if (!user.email) throw new ValidationError("Email is required");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  if (!user.name) throw new ValidationError("User name is required");
  const emailLower = user.email.toLowerCase();
  const coupleId = user.coupleId || userExist.coupleId;
  const newUser: UserUpdate = {
    name: user.name,
    email: emailLower,
    coupleId: coupleId,
  };
  const userUpdate = await userRepositories.update(newUser);
  return userUpdate;
};

const remove = async (id: string | undefined) => {
  await dbConnect();
  if (!id) throw new UnauthorizedError("Id is required for remove");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  const userRemove = await userRepositories.remove(id);
  return userRemove;
};

export const userService = { create, getOne, update, remove };
