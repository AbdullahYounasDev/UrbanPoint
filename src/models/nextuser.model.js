/** @format */

import mongoose from "mongoose";

const NextUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const NextUser =
  mongoose.models.NextUser || mongoose.model("NextUser", NextUserSchema);

export default NextUser;
