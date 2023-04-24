import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: String,
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
        // ,select: false
      },
      role: String
    },
    { versionKey: false }
  )
);

export default User