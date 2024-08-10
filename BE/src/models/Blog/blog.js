import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
    // title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now } uh huhu,
    // createdAt: { type: Date, default: Date.now } uh huhu,
    // createdAt: { type: Date, default: Date.now } uh huhu,
    // createdAt: { type: Date, default: Date.now } uh huhu,
    published: { type: Boolean, default: false },
    // imageUrl: { type: String},
},{timestamps: true, versionKey: false});

export default mongoose.model('blogs', blogSchema);


