import mongoose from "mongoose"

export const connectDB = async (uri) => {
    try {
        mongoose.connect(uri)
    } catch (error) {
        console.log(error);
    }
}