import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  coupleId: {
    type: mongoose.Schema.Types.Union,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: "Couple" }, String],
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const obj = returnedObject as Record<string, any>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
