import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
    },
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
