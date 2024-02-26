import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Get all users
// GET /api/users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password -email -_id -__v");

        return res.status(200).json({ success: true, message: "All users returned", count: users.length, users });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Signup a user
// POST /api/users/signup
export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide username, email and password" });
        }

        const user = await User.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Account created",
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Signin a user
// POST /api/users/signin
export const signinUser = async (req, res) => {
    try {
        const { id, name, username, email, role } = req.user;

        // Create and assign JWT token
        const token = jwt.sign({ id, name, username, email, role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        // Set auth cookie
        res.cookie("bs_auth", token, { httpOnly: true, maxAge: 900000 });

        return res.status(200).json({
            success: true,
            message: `${username} signed in`,
            user: { id, name, username, email, role },
            token,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Verify user
// POST /api/users/verify
export const verifyUser = async (req, res) => {
    const { id, name, username, email, role } = req.user;

    try {
        return res.status(200).json({ success: true, user: { id, username, email, name, role } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
