import mongoose, { Schema } from "mongoose";

const AttributeSchema = new Schema(
    {
        id_account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        attribute: {
            type: String,
            required: true
        },
        category_attribute: {
            type: String,
            required: true,
        },
        symbol_attribute: {
            type: String,
            required: true
        }
    },
    { timestamps: false, versionKey: false }
);
export default mongoose.model("Attribute", AttributeSchema);