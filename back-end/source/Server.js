import express from 'express';
import session from "express-session";
import passport from "./auth/passport.js";
import cors from "cors";
import TaskRoutes from './routes/TaskRoutes.js';
import PlaceRoutes from './routes/PlaceRoutes.js';
import EmailRoute from './routes/api/Email.js';
import WeatherRoutes from './routes/weatherRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static('../front-end/source'));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: '10mb' }));

    // NOTE:
    // These middleware functions are built-in Express middleware. They are
    // used to process incoming requests before they are sent to the routes.
    // There are many middleware functions available in Express, and you can
    // also create custom middleware functions.
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

  // Setup routes by using imported TaskRoutes
  setupRoutes() {
    this.app.use('/v1', TaskRoutes); // Mount TaskRoutes on the app
    this.app.use('/v1', PlaceRoutes);
    this.app.use('/v1', EmailRoute);
    this.app.use('/v1', WeatherRoutes);
    this.app.use("/", AuthRoutes);
  }

  // Start the server on a specified port
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log('Starting server...');
const server = new Server();
server.start();
