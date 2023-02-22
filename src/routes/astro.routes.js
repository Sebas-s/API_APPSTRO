import { Router } from "express";
import { methods as astroController } from "../controllers/astro.controller";

const router = Router();

router.get("/type/:id", astroController.getAstrosByType);
router.get("/types", astroController.getTypeAstros);
router.get("/one/:id", astroController.getAstroById);
router.delete("/one/:id", astroController.deleteAstroById);
export default router;
