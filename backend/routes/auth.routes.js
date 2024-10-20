import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

export default router;
