import { Router } from "express";
import { checkRole } from "../middleware/auth.js";
import { addBook, getBooks } from "../controllers/bookController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = Router();

router.post("/add", verifyJwt, checkRole, addBook);
router.get("/", verifyJwt, getBooks);

export default router;
