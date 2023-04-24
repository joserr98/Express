import mongoose from "mongoose";

const Pokemon = mongoose.model(
  "Pokemon",
  new mongoose.Schema(
    {
      name: String,
      type: String,
      type2: String,
      description: String,
      trainer: mongoose.Types.ObjectId,
    },
    { versionKey: false }
  )
);

export default Pokemon;
