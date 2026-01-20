import mongoose from "mongoose";

const coupleSchema = new mongoose.Schema({
  name: { type: String, required: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "CoupleMovie" }],
});

coupleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const obj = returnedObject as Record<string, any>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const Couple = mongoose.model("Couple", coupleSchema);

export default Couple;
