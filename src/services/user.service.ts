import { JWT_SECRET } from "../config/dotenv.js";
import type { User, UserUpdate } from "../interfaces/user.js";
import { userRepositories } from "../repositories/user.repositories.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ValidationError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/errors.js";

const create = async (
  name: string,
  email: string,
  password: string,
  idSession: string | undefined
) => {
  if (idSession) {
    throw new ValidationError("User should not have a session");
  }
  if (!name || !email || !password)
    throw new ValidationError("User name, email and password are required");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const coupleId = "";
  const userExist = await userRepositories.getOneByEmail(email);
  if (userExist) throw new ValidationError("User already exists");
  const newUser: User = {
    name: name,
    email: email,
    coupleId: coupleId,
    password: hashedPassword,
  };
  const userCreate = await userRepositories.create(newUser);
  return userCreate;
};

const getOne = async (email: string, password: string, idSession: string | undefined) => {
  if (idSession) {
    throw new ValidationError("User should not have a session");
  }
  if (!email || !password) throw new ValidationError("Email and password are required");
  const user = await userRepositories.getOneByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user!.password);
  if (!user || !isPasswordValid) throw new NotFoundError("Invalid credentials");
  const userToken = {
    id: user.id,
    name: user.name,
    coupleId: user.coupleId,
  };
  if (!JWT_SECRET) throw new InternalServerError("JWT secret not found");

  const token = jwt.sign({ user: userToken }, JWT_SECRET, { expiresIn: "1h" });
  return { user, token };
};

const update = async (id: string | undefined, user: UserUpdate) => {
  if (!id) throw new UnauthorizedError("Id is required for update");
  if (!user.email) throw new ValidationError("Email is required");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  if (!user.name) throw new ValidationError("User name is required");
  const coupleId = user.coupleId || userExist.coupleId;
  const newUser: UserUpdate = {
    name: user.name,
    email: user.email,
    coupleId: coupleId,
  };
  const userUpdate = await userRepositories.update(newUser);
  return userUpdate;
};

const remove = async (id: string | undefined) => {
  if (!id) throw new UnauthorizedError("Id is required for remove");
  const userExist = await userRepositories.getOneById(id);
  if (!userExist) throw new NotFoundError("User not found");
  const userRemove = await userRepositories.remove(id);
  return userRemove;
};

export const userService = { create, getOne, update, remove };
