import { Router } from "express";
import { getUsers, signinUser, signupUser, verifyUser } from "../controllers/userController.js";
import { checkRole, comparePassword, hashPassword } from "../middleware/auth.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = Router();

router.get("/", verifyJwt, checkRole, getUsers);
router.post("/signup", hashPassword, signupUser);
router.post("/signin", comparePassword, signinUser);
router.post("/verify", verifyJwt, verifyUser);

export default router;
