import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EmergencyContactsComponent } from '../EmergencyContactsComponent/EmergencyContactsComponent.js';


export class EmergencyContactsListComponent extends BaseComponent {
    #container = null;
    #contacts = []; // Store contacts array

    constructor() {
        super();
        console.log('A. ListComponent constructor starting');
        this.loadCSS('EmergencyContactsListComponent');
        // Wait for next tick before adding subscriptions
        console.log('B. Adding subscriptions after delay');
        this.#addEventSubscriptions();
        
        }

    #addEventSubscriptions() {
        console.log('C. Adding event subscriptions');
        const hub = EventHub.getInstance();

        console.log('Setting up subscription for:', 'EmergencyContact:loaded');

        // Listen for initial DB load
        hub.subscribe('EmergencyContact:loaded', contacts => {
            console.log('D. Received contacts from DB:', contacts);
            this.#contacts = contacts || [];
            this.#renderContacts();
        });

        // Request contacts after subscription is set up
        console.log('E. Requesting contacts load');
        hub.publish('EmergencyContact:request', null);

        
        //Listen for new contacts (instant updates)
        hub.subscribe('EmergencyContact:new', contact => {
            console.log('New contact added:', contact);
            this.#contacts.push(contact);
            this.#renderContacts();
        });

        // Listen for errors
        hub.subscribe('EmergencyContact:error', error => {
            console.error('Contact error:', error.message);
            //this.#showError(error.message);
        });

    }

    render() {
        if (this.#container) {
            return this.#container;
        }
        
        this.#createContainer();
        this.#setupContainerContent();
        //this.#attachEventListeners();

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('emergency-contacts-list');
    }

    #setupContainerContent() {
        this.#container.innerHTML = `
        <h2>Emergency Contacts</h2>
        <div class="error-message" style="display: none; color: red;"></div>
        <div id="loadingMessage" class="loading-message">Loading contacts...</div>
        <div id="contactsList"></div>
        <div id="noContactsMessage" class="no-contacts-message">.
        </div>
    `;

        /*
        this.#container.innerHTML = `
            <h2>Emergency Contacts</h2>
            <div id="contactsList"></div>
            <div id="noContactsMessage" class="no-contacts-message">
                No emergency contacts added yet.
            </div>
        `;
        */
    }

    #attachEventListeners() {
        const hub = EventHub.getInstance();

        // Listen for new contacts
        hub.subscribe('EmergencyContact:new', contactData => { //Contact data is fed through stream that travels from EmergencyContactInputComponent -> EventHub.js -> EmergencyContactListComponent
            this.#addContactToList(contactData);
        });
        // When InputComponent publishes a new contact, listener does:
        // - Receives the contact data
        // - Calls addContactToList with that data

        // Listen for contacts loaded from DB
        hub.subscribe('EmergencyContact:loaded', contacts => {
            this.#contacts = contacts || [];
            this.#renderContacts();
        });
        // When database loads contacts, listener does:
        // - Receives array of all contacts
        // - Replaces current contacts array
        // - Renders the full list

        // Listen for clear contacts success
        hub.subscribe('EmergencyContact:cleared', () => {
            this.#clearContactsList();
        });
        // - Calls clearContactsList to remove all contacts
    }

    #addContactToList(contactData) {
        this.#contacts.push(contactData);
        this.#renderContacts();
    }

    #renderContacts() {
        const contactsList = this.#container.querySelector('#contactsList');
        const noContactsMessage = this.#container.querySelector('#noContactsMessage');
        const loadingMessage = this.#container.querySelector('#loadingMessage');
        
        loadingMessage.style.display = 'none';

        // Clear current list
        contactsList.innerHTML = '';
        
        // Show/hide no contacts message
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