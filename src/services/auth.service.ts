import { ValidationError } from "../utils/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepositories } from "../repositories/user.repositories.js";
import type { User } from "../interfaces/user.js";
import { NotFoundError } from "../utils/errors.js";
import { InternalServerError } from "../utils/errors.js";
import { JWT_SECRET } from "../config/dotenv.js";

const register = async (
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

const login = async (email: string, password: string, idSession: string | undefined) => {
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

export const authService = { register, login };