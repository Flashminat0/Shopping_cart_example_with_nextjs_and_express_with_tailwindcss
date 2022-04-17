import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        shoppingCart: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true},
);

export default mongoose.model("User", userSchema);
