import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    imageUrl: { type: String, required: true }
});


export default mongoose.model('Blog', blogSchema);


