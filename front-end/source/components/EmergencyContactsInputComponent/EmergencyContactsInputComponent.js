import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class EmergencyContactsInputComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('EmergencyContactsInputComponent');
    }

    render() {
        if (this.#container) {
            return this.#container;
        }
        
        this.#createContainer();
        this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('emergency-contact-input');
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        return `
            <div class="emergency-contact-form">
                <h2>Add Emergency Contact</h2>
                <div class="input-group">
                    <label for="firstNameInput">First Name:</label>
                    <input type="text" id="firstNameInput" placeholder="Enter first name" required>
                </div>
                <div class="input-group">
                    <label for="lastNameInput">Last Name:</label>
                    <input type="text" id="lastNameInput" placeholder="Enter last name" required>
                </div>
                <div class="input-group">
                    <label for="emailInput">Email:</label>
                    <input type="email" id="emailInput" placeholder="Enter email address" required>
                </div>
                <button id="addContactBtn">Add Emergency Contact</button>
            </div>
        `;
    }

    #attachEventListeners() {
        const addContactBtn = this.#container.querySelector('#addContactBtn'); //locates and returns "addContactBtn" button id and returns it to addContactBtn
        addContactBtn.addEventListener('click', () => this.#handleAddContact());
    }

    #handleAddContact() {
        const firstName = this.#container.querySelector('#firstNameInput').value.trim();
        const lastName = this.#container.querySelector('#lastNameInput').value.trim();
        const email = this.#container.querySelector('#emailInput').value.trim();

        // Validation
        if (!this.#validateInputs(firstName, lastName, email)) {
            return;
        }

        // Create contact data object
        const contactData = {
            firstName,
            lastName,
            email
        };

        // Publish events
        this.#publishNewContact(contactData);
        
        // Clear form
        this.#clearInputs();
    }

    #validateInputs(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            alert('Please fill in all fields.');
            return false;
        }

        if (!this.#isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    #isValidEmail(email) {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    #publishNewContact(contactData) {
        const hub = EventHub.getInstance(); //ensures there is only one eventHub, "singleton"
        // Publish new contact event
        hub.publish('EmergencyContact:new', contactData);  //List Component sees this and updates the display - sent to event.js //hub.publish(Events.NewTask, { task, file });
 
        // Publish store contact event
        hub.publish('EmergencyContact:store', contactData); //Storage Component sees this and saves to database, not implemented yet - sent to event.js // hub.publish(Events.StoreTask, { task, file });
        
    }

    #clearInputs() {
        this.#container.querySelector('#firstNameInput').value = '';
        this.#container.querySelector('#lastNameInput').value = '';
        this.#container.querySelector('#emailInput').value = '';
    }
}