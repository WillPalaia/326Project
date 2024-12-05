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

//TODO: Add routes for login and logout

//Deletion Route
router.delete("/delete", deleteAccount);


export default router;