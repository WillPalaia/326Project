import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "./auth/passport.js";
import routes from "./routes/routes.js";

// Create an Express application
const app = express();

// Configure static file serving
app.use(express.static("public"));

// Configure the Express application
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session management.
// This is required to persist the login session across requests.
// The session data is stored in memory by default, but you can also
// store it in a database or a cache for better scalability.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session. This allows you to keep a user's authentication state across
// requests.
app.use(passport.initialize());
app.use(passport.session());

// Use routes from routes.js
app.use("/", routes);

// Start the Express application
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export default app;
