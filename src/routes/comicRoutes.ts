import { Router } from "express";
import { getComic, getRandomComic } from "../controllers/comicControllers";

const router = Router();

router.get("/random", getRandomComic);
router.get("/", getComic);
router.get("/:comicNumber", getComic);

export default router;
