import express from "express";
import passport from "../auth/passport.js";
import {
  register,
  login,
  logout,
  googleAuthCallback,
  deleteAccount
} from "../controller/AuthController.js";
import { isAuthenticated, authorizeRole } from "../auth/middleware.js";

const router = express.Router();

//Registration Route
router.post("/register", register);

//Login Route
router.post("/login", login);

//Logout Route
router.get("/logout", logout);

// Google Authentication routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

//Deletion Route
router.delete("/delete", deleteAccount);

export default router;