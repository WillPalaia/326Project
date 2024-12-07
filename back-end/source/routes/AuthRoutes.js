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

//Registration Route
router.post("/register", register);

router.post("/login", login);

//TODO: Add routes for logout

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
//TODO: Add routes for login and logout

//Deletion Route
router.delete("/delete", deleteAccount);

export default router;