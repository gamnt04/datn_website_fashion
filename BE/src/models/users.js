import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        fullName: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: Number
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            type: String,
            default: "../upload/default-avatar.jpeg",
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);