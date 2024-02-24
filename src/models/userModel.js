import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please provide a username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "please provide an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please provide a password"],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
