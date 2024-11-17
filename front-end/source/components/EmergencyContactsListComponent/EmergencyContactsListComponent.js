import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EmergencyContactsComponent } from '../EmergencyContactsComponent/EmergencyContactsComponent.js';


export class EmergencyContactsListComponent extends BaseComponent {
    #container = null;
    #contacts = []; // Store contacts array

    constructor() {
        super();
        console.log('A. EmergencyContactsListComponent constructor starting');
        
        this.loadCSS('EmergencyContactsListComponent');

        this.#addEventSubscriptions();
        
        }

    #addEventSubscriptions() {
        console.log("#addEventSubscriptions in EmergencyContactsListComponent");
        
        console.log('C. Adding event subscriptions');
        
        const hub = EventHub.getInstance();

        console.log('Setting up subscription for:', 'EmergencyContact:loaded');

        //Set up Listener for 'EmergencyContact:loaded': called by loadContactsFromDB() in ECService.js 
        hub.subscribe('EmergencyContact:loaded', contacts => {
            console.log('D. Received contacts from DB:', contacts);
            this.#contacts = contacts || [];
            this.#renderContacts();
        });

        
        /*
        1. hub.publish('EmergencyContact:request', null);
        2. this.loadContactsFromDB(); from addSubscriptions() from EmergencyContactsService
        3. EventHub.getInstance().publish('EmergencyContact:loaded', contacts); 
        4. this.#renderContacts(); 
        5. UI displays
        */ 
        console.log('E. Requesting contacts "EmergencyContact:loaded"');
        hub.publish('EmergencyContact:request', null);
        
        
        //Sets up listener for new inputted values  
        hub.subscribe('EmergencyContact:new', contact => {
            console.log('New contact added:', contact);
            this.#contacts.push(contact);
            this.#renderContacts();
        });

        // Listen for errors: 
        hub.subscribe('EmergencyContact:error', error => {
            console.error('Contact error:', error.message);
            //this.#showError(error.message);
        });

    }

    render() {
        console.log("render in EmergencyContactsListComponent")
        if (this.#container) {
            return this.#container;
        }
        
        this.#createContainer();
        this.#setupContainerContent();

        return this.#container;
    }

    #createContainer() {
        console.log("#createContainer in EmergencyContactsListComponent")
        this.#container = document.createElement('div');
        this.#container.classList.add('emergency-contacts-list');
    }

    #setupContainerContent() {
        console.log("#setupContainerContent in EmergencyContactsListComponent")
        this.#container.innerHTML = `
        <h2>Emergency Contacts</h2>
        <div class="error-message" style="display: none; color: red;"></div>
        <div id="loadingMessage" class="loading-message">Loading contacts...</div>
        <div id="contactsList"></div>
        <div id="noContactsMessage" class="no-contacts-message">.
        </div>
    `;
    }


    #renderContacts() {
        console.log("#renderContacts in EmergencyContactsListComponent")
        const contactsList = this.#container.querySelector('#contactsList');
        const noContactsMessage = this.#container.querySelector('#noContactsMessage');
        const loadingMessage = this.#container.querySelector('#loadingMessage');
        
        loadingMessage.style.display = 'none';

        // Clear current list
        contactsList.innerHTML = '';
        
        // display no contacts message
        if (this.#contacts.length === 0) {
            noContactsMessage.style.display = 'block';
            contactsList.style.display = 'none';
            return;
        }

        // Hide message and show contacts
        noContactsMessage.style.display = 'none';
        contactsList.style.display = 'block';

        // Render each contact
        this.#contacts.forEach(contactData => {
            const contactComponent = new EmergencyContactsComponent(contactData);
            const contactContainer = document.createElement('div');
            contactContainer.classList.add('contact-container');
            contactContainer.appendChild(contactComponent.render());
            contactsList.appendChild(contactContainer);
        });
    }


    #clearContactsList() {
        this.#contacts = [];
        this.#renderContacts();
    }

    getContainer() {
        return this.#container;
    }
}