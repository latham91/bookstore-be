import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connection.js";
import chalk from "chalk";

// Load environment variables from .env file
dotenv.config();

// Route imports
import userRoutes from "./routes/userRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Healthcheck route
app.get("/health", (req, res) => {
    try {
        res.status(200).json({ success: true, message: "API is healthy" });
    } catch (err) {
        res.status(500).json({ success: false, message: "API Error", error: err.message });
    }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);

app.listen(port, () => {
    connectDB();
    console.log(chalk.bold.bgGreenBright(`Server is running on port ${port}`));
});
