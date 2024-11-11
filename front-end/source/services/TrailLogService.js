import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

/* 
This is a service file that can be used to log data in the browser 
redgarding the trails that a user adds. It will track the trail name, 
location, length, and date hiked. 
*/ 

export class TrailLogService extends Service {
  constructor() {
    super();
    this.dbName = 'trailDB';
    this.storeName = 'trails';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load trails on initialization
        this.loadTrailsFromDB();
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

  async storeTrail(trailData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      //add an object to the DB that includes the trail name and distance
      const request = store.add({
        trailName: trailData.trailName,
        distance: Number(trailData.distance)
      });

      request.onsuccess = () => {
        this.publish(Events.StoreTrailSuccess, trailData);
        resolve('Trail stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreTrailFailure, trailData);
        reject('Error storing trail');
      };
    });
  }

  async loadTrailsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const trails = event.target.result;
        trails.forEach(trail => this.publish('NewTrail', trail));
        resolve(trails);
      };

      request.onerror = () => {
        this.publish(Events.LoadTrailsFailure);
        reject('Error retrieving trails');
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
