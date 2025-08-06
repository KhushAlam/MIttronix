import express from "express";
import {
  adminLogin,
  userLogin,
  userSignup,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/reset-password", resetPassword);

export default router;
