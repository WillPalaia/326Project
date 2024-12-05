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

router.post("/login", login);

//TODO: Add routes for logout

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