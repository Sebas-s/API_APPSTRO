import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/login", userController.getSessionAcount);
router.post("/signup", userController.addUser);
router.put("/account/confim/:tk", userController.confirmAccount );

export default router;
