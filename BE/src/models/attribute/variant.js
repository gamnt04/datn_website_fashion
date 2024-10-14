import mongoose from "mongoose";

const schema_variant = new mongoose.Schema({

    values: [
        {
            color: {
                type: String,
                required: true,
                trim: true
            },
            ui_attribute: String,
            size: [
                {
                    name_size: String,
                    stock_attribute: {
                        type: Number,
                        min: 0
                    },
                    price_attribute: Number

                }
            ],
        },
    ],
}, { timeStamps: true, versionKey: false });
export default mongoose.model('Variant', schema_variant)