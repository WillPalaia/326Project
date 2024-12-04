import express from "express";
import passport from "../auth/passport.js";
import {
  register,
  login,
  logout,
  googleAuthCallback,
  getAdminArea,
  getProfile,
} from "../controller/controller.js";
import { isAuthenticated, authorizeRole } from "../auth/middleware.js";

const router = express.Router();

router.post("/register", register);


export default router;