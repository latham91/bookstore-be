import Book from "../models/bookModel.js";
import Author from "../models/authorModel.js";
import Genre from "../models/genreModel.js";

// Add a book
// POST /api/books/add
// Admin only
export const addBook = async (req, res) => {
    try {
        const { title, author, genre, description } = req.body;

        if (!title || !author || !genre || !description) {
            return res.status(400).json({ success: false, message: "Please provide title, author, and genre" });
        }

        const findAuthor = await Author.findOne({ name: author });
        if (!findAuthor) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        const findGenre = await Genre.findOne({ name: genre });
        if (!findGenre) {
            return res.status(404).json({ success: false, message: "Genre not found" });
        }

        const book = await Book.create({ title, author: findAuthor._id, genre: findGenre._id, description });
        await Author.findByIdAndUpdate(findAuthor._id, { $push: { books: book._id } });
        await Genre.findByIdAndUpdate(findGenre._id, { $push: { books: book._id } });

        return res.status(201).json({ success: true, message: "Book created successfully", book });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Get all books
// GET /api/books
export const getBooks = async (req, res) => {
    try {
        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            const books = await Book.find({}, "-likes -__v")
                .populate("author", "-_id -__v -books -__v")
                .populate("genre", "-_id -__v -books -__v")
                .limit(limit);
            if (!books) {
                return res.status(404).json({ success: false, message: "No books found" });
            }

            return res.status(200).json({ success: true, message: "Books retrieved successfully", books });
        }

        const books = await Book.find({}, "-likes -__v")
            .populate("author", "-_id -__v -books -__v")
            .populate("genre", "-_id -__v -books -__v");
        if (!books) {
            return res.status(404).json({ success: false, message: "No books found" });
        }

        return res.status(200).json({ success: true, message: "Books retrieved successfully", books });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
