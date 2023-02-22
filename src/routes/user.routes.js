import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/login", userController.getSessionAcount);
router.post("/sigup", userController.createUnregisterUser );
router.post("/account/confim/:tk", userController.confirmAccount );

export default router;
