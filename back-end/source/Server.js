import express from "express";
import session from "express-session";
import passport from "./auth/passport.js";
import cors from "cors";

// Import routes
import AuthRoutes from "./routes/AuthRoutes.js"; 
import TaskRoutes from "./routes/TaskRoutes.js";
import PlaceRoutes from "./routes/PlaceRoutes.js";
import WeatherRoutes from "./routes/weatherRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware
  configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static("../front-end/source"));

    // Parse JSON bodies
    this.app.use(express.json({ limit: "10mb" }));

    // Enable CORS
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    // Configure session for Passport
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false,
      })
    );

    // Initialize Passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  // Setup routes
  setupRoutes() {
    this.app.use("/v1", TaskRoutes);
    this.app.use("/v1", PlaceRoutes);
    this.app.use("/v1", WeatherRoutes);

    // Add authentication routes
   this.app.use("/", AuthRoutes); // Correctly mounts all authentication routessetupRoutes() {
    this.app.use("/v1", TaskRoutes);
    this.app.use("/v1", PlaceRoutes);
    this.app.use("/v1", WeatherRoutes);
    this.app.use("/", AuthRoutes);
  
    // Serve index.html for all unknown routes
    this.app.get("*", (req, res) => {
      res.sendFile("index.html", { root: "front-end/source" });
    });
  
  }

  // Start the server
  start(port = process.env.PORT || 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();
