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
        //Reminder: this.addSubscriptions(); is automatically called in service.js so calling it again here would be making two calls of this.addSubscriptions();
        
        console.log('2. Service constructor starting');
        this.dbName = 'emergencyContactsDB';
        this.storeName = 'contacts';
        this.db = null;

        // Initialize database and subscribe to events
        this.initDB().then(() => {
                console.log('3. DB initialized');
                //this.EmergencyContactRequestListener();
                console.log('Next Stop');
            
            
        })     
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
    //the reason this code uses a promise is because for it to be async it needs to use a promise
    async storeContact(contactData) {
        console.log("storeContact()")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            //The .add IndexedDB method returns an object called an IDBRequest. This object comes with specific event handlers that work with onsuccess and onerror. It essentially tells onsuccess if the data was stored in IndexedDB 
            const request = store.add(contactData);

            request.onsuccess = () => {
                console.log("stored to IndexedDB successfully")
                resolve("stored successfully")
                
            };

            request.onerror = () => {
                console.log("Error storing to IndexedDB");
                reject("Error storing")
            };
        });
    }
    //Publishes loadedContacts to be passed to EClistComp
    async loadContactsFromDB() {
        return new Promise((resolve, reject) => {
            console.log('4. LoadContactsFromDB')

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
    //Sets up a listener for the event 'EmergencyContact:new: When that event occurs call this.storeContact(contactData);
    addSubscriptions() {
        console.log("1. addSubscriptions")

        const hub = EventHub.getInstance();

        hub.subscribe('EmergencyContact:new', contactData => {
            console.log('Received request to store ContactData');
            this.storeContact(contactData)
        });

        hub.subscribe('EmergencyContact:request', () => {
            console.log('Received request to load contacts');
            this.loadContactsFromDB();
        });

         // Listen for errors: 
         hub.subscribe('EmergencyContact:clear', () => {
            this.clearAllIndexedDBData(); 
        });
    }


    async clearAllIndexedDBData() {
        return new Promise((resolve, reject) => {
            console.log('clearAllIndexedDBData');
    
            const transaction = this.db.transaction([this.storeName], 'readwrite');  
            const store = transaction.objectStore(this.storeName);
            const request = store.clear(); 
    
            request.onsuccess = () => {
                console.log(`data cleared from store: ${this.storeName}`);
                resolve(`All data cleared from store: ${this.storeName}`);
            };
    
            request.onerror = () => {
                console.error('error clearing data from IndexedDB');
                EventHub.getInstance().publish('EmergencyContact:error', {
                    message: 'Failed to clear contacts'
                });
                reject('Error clearing data from IndexedDB');
            };
        });
    }
    


}