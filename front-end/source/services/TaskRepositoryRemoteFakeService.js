import Service from "./Service.js";
import { fetch } from "../utility/fetch.js";

export class TaskRepositoryRemoteFakeService extends Service {
  constructor() {
    super();
  }

  async storeTask(taskData) {
    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return data;
  }

  async clearTasks() {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

  addSubscriptions() {
    this.subscribe(Events.StoreTask, (data) => {
      this.storeTask(data);
    });

    this.subscribe(Events.UnStoreTasks, () => {
      this.clearTasks();
    });
  }
}
