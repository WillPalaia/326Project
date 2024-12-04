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