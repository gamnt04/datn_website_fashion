import mongoose from "mongoose";

export const connect = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connect successfully");
  } catch (error) {
    console.log("connect error: " + error);
  }
};
