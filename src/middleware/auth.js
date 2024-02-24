import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "Please provide a password" });
        }

        const hashedPass = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPass;

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

export const comparePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password missing" });
        }

        const user = await User.findOne({ email }, "-__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Auth Error", error: err.message });
    }
};

export const checkRole = async (req, res, next) => {
    try {
        const { role } = req.user;
        console.log(req.user);
        if (role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
