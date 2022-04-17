import mongoose from "mongoose";

const {Schema} = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        image: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
    },
    {timestamps: true},
);

export default mongoose.model("Products", productSchema);
