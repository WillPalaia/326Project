// Server.js
import express from "express";
import TaskRoutes from "./routes/TaskRoutes.js";
import PlaceRoutes from "./routes/PlaceRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static("../front-end/source"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));

    // NOTE:
    // These middleware functions are built-in Express middleware. They are
    // used to process incoming requests before they are sent to the routes.
    // There are many middleware functions available in Express, and you can
    // also create custom middleware functions.
  }

  // Setup routes by using imported TaskRoutes
  // /v1 is simply an organizing tool, the help specify where each route is going: Think of it like organizing a library: /v1 is the main section, and TaskRoutes defines all the shelves and books within that section.
  setupRoutes() {
    this.app.use("/v1", TaskRoutes); // Mount TaskRoutes on the app
    this.app.use("/v1", PlaceRoutes);
    
  }

  // Start the server on a specified port
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();
