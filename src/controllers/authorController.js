import Author from "../models/authorModel.js";

export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({}, "-__v").populate({
            path: "books",
            select: "-_id -__v -author -likes -description",
            populate: { path: "genre", select: "-_id -__v -books" },
        });

        if (authors.length === 0) {
            return res.status(404).json({ success: false, message: "No authors found", count: authors.length });
        }

        return res.status(200).json({ success: true, message: "Authors retrieved successfully", data: authors });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Add author
// POST /api/authors/add
// Admin only
export const addAuthor = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ success: false, message: "Please provide a name" });
        }

        const author = await Author.create({ name: req.body.name });

        return res.status(201).json({ success: true, message: "Author created successfully", data: author });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
