import { Router } from "express";
import { checkRole } from "../middleware/auth.js";
import { addAuthor, getAuthors } from "../controllers/authorController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = Router();

router.post("/add", verifyJwt, checkRole, addAuthor);
router.get("/", verifyJwt, getAuthors);

export default router;
