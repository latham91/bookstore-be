import { Router } from "express";
import { checkRole } from "../middleware/auth.js";
import verifyJwt from "../middleware/verifyJwt.js";
import { addGenre, getGenres } from "../controllers/genreController.js";

const router = Router();

router.post("/add", verifyJwt, checkRole, addGenre);
router.get("/", verifyJwt, getGenres);

export default router;
