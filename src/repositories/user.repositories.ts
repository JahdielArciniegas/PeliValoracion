import type { User as UserInterface } from "../interfaces/user.js";
import User from "../schema/user.js";

const create = async (user: UserInterface) => {
  const newUser = new User({
    name: user.name,
    email: user.email,
    coupleId: user.coupleId,
  });
  const result = await newUser.save();
  return result;
};

const getOneByEmail = async (email: string) => {
  const result = await User.findOne<UserInterface>({ email: email });
  return result;
};

const getOneById = async (id: string) => {
  const result = await User.findOne<UserInterface>({ _id: id });
  return result;
};

const update = async (user: UserInterface) => {
  const result = await User.findByIdAndUpdate(user.id, user, {
    new: true,
  }).populate("coupleId");
  return result;
};

const remove = async (id: string) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};

export const userRepositories = {
  create,
  getOneByEmail,
  getOneById,
  update,
  remove,
};
