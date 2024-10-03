import mongoose from "mongoose";

const schema_variant = new mongoose.Schema({
    variants: [
        {
            attribute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Attribute'
            },
            value_variants: [
                {
                    name_variant: {
                        type: String,
                        required: true
                    },
                    price_variant: {
                        type: Number,
                        min: 0,
                        default: 0,
                        required: true
                    },
                    stock_variant: {
                        type: Number,
                        min: 0,
                        default: 0,
                        required: true
                    }
                }
            ]
        }
    ]
}, { timeStamps: true, versionKey: false });
export default mongoose.model('Variant', schema_variant)