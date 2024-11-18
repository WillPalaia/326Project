import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class FriendsPageService extends Service {
  constructor() {
    console.log("friendspageSeriviuce")
    super();
    this.dbName = 'friendDB';
    this.storeName = 'friends';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load friends on initialization
        this.loadFriendsFromDB();
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

  async storeFriend(friendData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(friendData);

      request.onsuccess = () => {
        this.publish(Events.StoreFriendSuccess, friendData);
        resolve('Friend stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreFriendFailure, friendData);
        reject('Error storing friend');
      };
    });
  }

  async loadFriendsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const friends = event.target.result;
        friends.forEach(friend => this.publish(Events.NewFriend, friend));
        resolve(friends);
      };

      request.onerror = () => {
        this.publish(Events.LoadFriendFailure);
        reject('Error retrieving friends');
      };
    });
  }

  async clearFriends() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreFriendsSuccess);
        resolve('All friends cleared');
      };

      request.onerror = () => {
        this.publish(Events.UnStoreFriendsFailure);
        reject('Error clearing friends');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreFriend, data => {
      this.storeFriend(data);
    });

    this.subscribe(Events.UnStoreFriends, () => {
      this.clearFriends();
    });
  }
}