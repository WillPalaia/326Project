// This is a simple model that stores tasks in memory. It has methods to create,
// read, update, and delete tasks. The tasks are stored in an array, and the
// methods manipulate this array to perform the CRUD operations.
//
// This model is useful for prototyping and testing, as it provides a quick way
// to store and manipulate data without the need for a persistent database. It
// can be easily replaced with a more sophisticated database model when needed.
class _InMemoryTaskModel {
  static taskid = 1;

  constructor() {
    this.tasks = [];
  }

  async create(task) {
    task.id = _InMemoryTaskModel.taskid++;
    this.tasks.push(task);
    return task;
  }

  async read(id = null) {
    if (id) {
      return this.tasks.find((task) => task.id === id);
    }

    return this.tasks;
  }

  async update(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[index] = task;
    return task;
  }

  async delete(task = null) {
    if (task === null) {
      this.tasks = [];
      return;
    }

    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(index, 1);
    return task;
  }
}

// Create a singleton instance of the InMemoryTaskModel.
const InMemoryTaskModel = new _InMemoryTaskModel();

// Initialize the model with some sample tasks.
InMemoryTaskModel.create({ task: "Description 1", file: null, filename: null });
InMemoryTaskModel.create({ task: "Description 2", file: null, filename: null });
InMemoryTaskModel.create({ task: "Description 3", file: null, filename: null });

export default InMemoryTaskModel;
