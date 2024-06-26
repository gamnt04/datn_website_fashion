import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to Database");
  } catch (error) {
    console.log(error);
  }
};
