import type { Couple as CoupleInterface } from "../interfaces/couple.js";
import Couple from "../schema/couple.js";

const create = async (id: string) => {
  const newCouple = new Couple({
    name: "",
    users: [id],
  });
  const result = await newCouple.save();
  return result;
};

const getOne = async (id: string) => {
  const result = await Couple.findById<CoupleInterface>(id);
  return result;
};

const update = async (id: string, couple: CoupleInterface) => {
  const result = await Couple.findByIdAndUpdate(id, couple, { new: true });
  return result;
};

const remove = async (id: string) => {
  const result = await Couple.findByIdAndDelete(id);
  return result;
};

export const coupleRepositories = { create, getOne, update, remove };
