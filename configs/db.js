import { throwErrorByMessage } from "@/utils/api/errors";
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("-- Database connected successfully --");
  } catch (error) {
    throwErrorByMessage(error);
  }
}