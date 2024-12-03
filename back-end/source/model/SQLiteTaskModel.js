import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Define the Task model
const Task = sequelize.define("Task", {
  taskid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

class _SQLiteTaskModel {
  constructor() {}

  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // An exception will be thrown if either of these operations fail.

    if (fresh) {
      await this.delete();

      await this.create({
        task: "Description 1",
        file: null,
        filename: null,
      });

      await this.create({
        task: "Description 2",
        file: null,
        filename: null,
      });

      await this.create({
        task: "Description 3",
        file: null,
        filename: null,
      });
    }
  }

  async create(task) {
    return await Task.create(task);
  }

  async read(id = null) {
    if (id) {
      return await Task.findByPk(id);
    }

    return await Task.findAll();
  }

  async update(task) {
    const tasku = await Task.findByPk(task.taskid);
    if (!tasku) {
      return null;
    }

    await tasku.update(task);
    return tasku;
  }

  async delete(task = null) {
    if (task === null) {
      await Task.destroy({ truncate: true });
      return;
    }

    await Task.destroy({ where: { taskid: task.taskid } });
    return task;
  }
}

const SQLiteTaskModel = new _SQLiteTaskModel();

export default SQLiteTaskModel;
