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
      .then(() => console.log("Database initialized"))
      .catch(error => console.error('Error initializing database:', error));
  }

  async initDB() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = () => reject('Error initializing IndexedDB');
    });
  }

  async storeTask(taskData) {
    const db = await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(taskData);

      request.onsuccess = () => resolve('Task stored successfully');
      request.onerror = error => reject(`Error storing task: ${error.target.error}`);
    });
  }

  async loadTasksFromDB() {
    const db = await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => resolve(event.target.result);
      request.onerror = error => reject(`Error retrieving tasks: ${error.target.error}`);
    });
  }

  async clearTasks() {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreTasksSuccess);
        resolve('All tasks cleared');
      };

      request.onerror = error => {
        this.publish(Events.UnStoreTasksFailure);
        reject(`Error clearing tasks: ${error.target.error}`);
      };
    });
  }

  async deleteTask(taskId) {
    const db = await this.initDB();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(taskId);
  
      request.onsuccess = () => resolve(`Task with ID ${taskId} deleted successfully`);
      request.onerror = error => reject(`Error deleting task: ${error.target.error}`);
    });
  }
  
  async updateTrailOrder(trails) {
    const db = await this.initDB();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      store.clear(); 
      trails.forEach((trail) => {
        store.add(trail); 
      });
  
      transaction.oncomplete = () => resolve("Trail order updated successfully");
      transaction.onerror = (error) => reject(`Error updating trail order: ${error.target.error}`);
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
