import Genre from "../models/genreModel.js";

// Add a genre
// POST /api/genres/add
// Admin only
export const addGenre = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ success: false, message: "Please provide a name" });
        }

        const genre = await Genre.create({ name: req.body.name });

        return res.status(201).json({ success: true, message: "Genre created successfully", data: genre });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Get all genres
// GET /api/genres
export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find().populate({
            path: "books",
            select: "-_id -__v -likes -genre -description",
            populate: { path: "author", select: "name -_id" },
        });
        if (!genres) {
            return res.status(404).json({ success: false, message: "No genres found" });
        }

        return res.status(200).json({ success: true, message: "Genres retrieved successfully", data: genres });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
