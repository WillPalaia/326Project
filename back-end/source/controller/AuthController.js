import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../model/User.js";

// Load environment variables from a .env file
dotenv.config();

// Helper functions
// This function creates a response object with a status and a message.
const factoryResponse = (status, message) => ({ status, message });

const existsUser = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
  };
  
  // Registration route.
  // This route creates a new user in the database.
export const register = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username is already taken
    if (await existsUser(username))
      return res.status(400).json(factoryResponse(400, "Username already taken"));
  
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });
    res.json(factoryResponse(200, "Registration successful"));
    console.log("User registered successfully");
};

// Login route.
// This route checks the user's credentials and logs them in.
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(factoryResponse(401, "Invalid credentials"));
    }

    // If using Passport session management
    req.login(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return res.status(500).json(factoryResponse(500, "Login failed"));
      }

      res.json(factoryResponse(200, "Login successful"));
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json(factoryResponse(500, "Internal server error"));
  }
};
// Logout route.
// This route logs the user out.
// The req.logout() function is provided by Passport. It removes the user's
// session and logs them out.
export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.json(factoryResponse(500, "Logout failed"));
      return;
    }
    res.json(factoryResponse(200, "Logout successful"));
  });
};

export const googleAuthCallback = (req, res) => {
  res.redirect("/");
};
//This is used to delete the users account from the database
export const deleteAccount = async (req, res) => {
    const username = req.body.username;
    const result = await User.destroy({
        where: { username: username }
      });
      if (result) {
        //if account deletion successful 
        res.json(factoryResponse(200, "Account deleted successfully"));
      } else {
        //if not
        res.status(404).json(factoryResponse(404, "Account not found"));
      }
  };