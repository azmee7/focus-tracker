import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  name: String,
  days: [Number],
  streak: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  image: String,
  goal: String,
  habits: [HabitSchema],
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User ||
  mongoose.model("User", UserSchema);

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default openai;

