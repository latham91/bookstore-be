import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"],
    },
    description: {
        type: String,
        required: [true, "please provide a description"],
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like",
        },
    ],
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
