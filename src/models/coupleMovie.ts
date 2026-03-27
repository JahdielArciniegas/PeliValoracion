import mongoose from "mongoose";

const coupleMovieSchema = new mongoose.Schema({
  movieId: String,
  movieName: String,
  moviePoster: String,
  coupleId: {
    type: mongoose.Types.ObjectId,
    ref: "Couple",
  },
  ratings: Array,
});

coupleMovieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const obj = returnedObject as Record<string, any>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const CoupleMovie = mongoose.model("CoupleMovie", coupleMovieSchema);

export default CoupleMovie;
