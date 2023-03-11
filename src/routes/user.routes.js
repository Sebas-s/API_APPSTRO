import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";

const router = Router();


router.post("/signup", userController.addUser);
router.get("/", userController.getAllUsers);

export default router;
