import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

export default router;
