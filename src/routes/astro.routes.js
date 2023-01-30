import { Router } from "express";
import { methods as astroController } from "../controllers/astro.controller";

const router = Router();

router.get("/all", astroController.getAstros);
router.get("/tAstro/", astroController.getTypeAstros);
router.get("/:id", astroController.getAstroById);
export default router;
