import { Router } from "express";
import { login, logout, signup } from "../controller/auth.controller.js";

const router = Router();

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
