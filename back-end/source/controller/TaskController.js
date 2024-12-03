// The controller pattern is a design pattern commonly used in software
// engineering to separate the business logic of an application from its
// presentation layer. It organizes the code in a way that keeps the
// handling of user requests, business rules, and data processing separate
// from the user interface and data models. This pattern is especially
// useful in applications that involve handling HTTP requests, such as
// web applications, where different types of requests need distinct
// processing workflows.

// In the controller pattern, a "controller" is responsible for taking user
// input (e.g., an HTTP request), processing it according to the business
// logic, and sending a response. By using this pattern, each controller
// method manages a specific functionality, like adding a task or updating
// a user profile, which keeps the logic modular and reusable. Controllers
// interact with models (for data) and views (for user feedback) without
// knowing the internal details of each, promoting low coupling.

// The controller pattern also improves maintainability by isolating
// different concerns in the codebase. Changes to business logic or data
// processing can be made within the controller without affecting other
// parts of the application. Additionally, this pattern allows for easier
// testing, as each controller can be tested in isolation to verify that it
// handles input and output correctly, without dependencies on the
// application's interface or data storage layers.

import ModelFactory from "../model/ModelFactory.js";

class TaskController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all tasks
  async getAllTasks(req, res) {
    const tasks = await this.model.read();
    // The response is an object with a 'tasks' property containing an array of
    // tasks. This could be anything, but we define it as an object with a
    // 'tasks' property to keep the response consistent across different
    // endpoints.
    res.json({ tasks });
  }

  // Add a new task
  async addTask(req, res) {
    try {
      // Check if 'task' is provided in the request body
      if (!req.body || !req.body.task) {
        return res.status(400).json({ error: "Task description is required." });
      }

      // Create the new task object with a unique ID
      const task = await this.model.create(req.body);

      // Log the full task for debugging
      const file = req.body.file
        ? `with file: ${req.body.filename}`
        : "without file";
      console.log(`New Task: ${task.id} - ${task.task} - ${file}`);

      // Send back the created task as the response
      return res.status(201).json(task);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error adding task:", error);
      return res
        .status(500)
        .json({ error: "Failed to add task. Please try again." });
    }
  }

  // Clear all tasks
  async clearTasks(req, res) {
    await this.model.delete();
    res.json(await this.model.read());
  }
}

export default new TaskController();
