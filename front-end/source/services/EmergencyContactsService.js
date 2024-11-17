import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

/*
Example Usage: 

//set in EmergencyContactsInput.js
contactData = {Ben, Thomas, benjthomas@umass.edu}

#publishNewContact(contactData) {
    hub.publish('EmergencyContact:store', contactData);
} 

*/

export class EmergencyContactsService extends Service {
    constructor() {
        super();
        console.log('1. Service constructor starting');
        this.dbName = 'emergencyContactsDB';
        this.storeName = 'contacts';
        this.db = null;

        // Initialize database and subscribe to events
        this.initDB().then(() => {
                console.log('2. DB initialized');
                console.log('DB initialized, about to load contacts');
                this.loadContactsFromDB().then(contacts => {
                    console.log('3. Contacts loaded and published', contacts);
            });
        })
        
        
                //Reminder: this.addSubscriptions(); is automatically called in service.js so calling it again here would be making two calls of this.addSubscriptions();
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
                //EventHub.getInstance().publish('EmergencyContact:new', contactData);
                resolve('Contact stored successfully');
            };

            request.onerror = () => {
                EventHub.getInstance().publish('EmergencyContact:error', {
                    message: 'Failed to load contact',
                });
                reject('Error storing contact');
            };
        });
    }
    //Publishes loadedContacts to be passed to EClistComp
    async loadContactsFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = event => {
                const contacts = event.target.result;
                console.log('About to publish contacts:', contacts);
                EventHub.getInstance().publish('EmergencyContact:loaded', contacts);
                console.log('Published contacts event');
                
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
        EventHub.getInstance().subscribe('EmergencyContact:new', contactData => {
            // Store in database
            this.storeContact(contactData).catch(error => {
                // If storage fails, notify system
                EventHub.getInstance().publish('EmergencyContact:error', {
                    message: 'Failed to store contact',
                    error
                });
        });
        });
    }
}