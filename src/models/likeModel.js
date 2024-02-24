import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
