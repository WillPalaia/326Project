import { EventHub } from '../eventhub/EventHub.js';
import { Service } from './Service.js';

export class EmergencyContactsService extends Service {
    constructor() {
        super();
        this.dbName = 'emergencyContactsDB';
        this.storeName = 'contacts';
        this.db = null;

        // Initialize database and subscribe to events
        this.initDB()
            .then(() => {
                this.loadContactsFromDB();  // Load existing contacts on initialization
                this.addSubscriptions();
            })
            .catch(error => {
                console.error('Failed to initialize DB:', error);
            });
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, {
                    keyPath: 'id',
                    autoIncrement: true
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

    async storeContact(contactData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(contactData);

            request.onsuccess = () => {
                EventHub.getInstance().publish('EmergencyContact:stored', contactData);
                resolve('Contact stored successfully');
            };

            request.onerror = () => {
                EventHub.getInstance().publish('EmergencyContact:error', {
                    message: 'Failed to store contact',
                    data: contactData
                });
                reject('Error storing contact');
            };
        });
    }

    async loadContactsFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = event => {
                const contacts = event.target.result;
                // Publish each contact individually to maintain consistency with new contacts
                contacts.forEach(contact => {
                    EventHub.getInstance().publish('EmergencyContact:new', contact);
                });
                resolve(contacts);
            };

            request.onerror = () => {
                EventHub.getInstance().publish('EmergencyContact:error', {
                    message: 'Failed to load contacts'
                });
                reject('Error loading contacts');
            };
        });
    }

    addSubscriptions() {
        // Subscribe to store contact events
        EventHub.getInstance().subscribe('EmergencyContact:store', contactData => {
            this.storeContact(contactData);
        });
    }
}