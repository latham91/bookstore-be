import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
    const token = req.cookies.bs_auth;

    if (!token) {
        res.clearCookie("bs_auth");
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify jwt token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        res.clearCookie("bs_auth");
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export default verifyJwt;
