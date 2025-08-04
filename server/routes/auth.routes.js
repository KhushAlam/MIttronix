import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import {
  adminLogin,
  userLogin,
  userSignup,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/admin/login", verifyAdmin, adminLogin);
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/reset-password", resetPassword);

export default router;
