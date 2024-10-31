import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class TaskRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'taskDB';
    this.storeName = 'tasks';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load tasks on initialization
        this.loadTasksFromDB();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeTask(taskData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(taskData);

      request.onsuccess = () => {
        this.publish(Events.StoreTaskSuccess, taskData);
        resolve('Task stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreTaskFailure, taskData);
        reject('Error storing task: ');
      };
    });
  }

  async loadTasksFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const tasks = event.target.result;
        tasks.forEach(task => this.publish('NewTask', task));
        resolve(tasks);
      };

      request.onerror = () => {
        this.publish(Events.LoadTasksFailure);
        reject('Error retrieving tasks');
      };
    });
  }

  async clearTasks() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreTasksSuccess);
        resolve('All tasks cleared');
      };

      request.onerror = () => {
        this.publish(Events.UnStoreTasksFailure);
        reject('Error clearing tasks');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreTask, data => {
      this.storeTask(data);
    });

    this.subscribe(Events.UnStoreTasks, () => {
      this.clearTasks();
    });
  }
}
