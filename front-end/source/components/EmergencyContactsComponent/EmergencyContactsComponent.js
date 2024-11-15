import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class EmergencyContactsComponent extends BaseComponent {
    #container = null;

    constructor(contactData = {}) {
        super();
        this.contactData = contactData;
        this.loadCSS('EmergencyContactsComponent');
    }

    render() {
        // Create the main container
        this.#container = document.createElement('div');
        this.#container.classList.add('emergency-contact-item'); //assigns CSS style to "this.#container" element 

        // Create and add contact information
        const contactInfo = this.#createContactInfo();
        this.#container.appendChild(contactInfo);

        return this.#container;
    }

    // Private method to create contact information element
    #createContactInfo() {
        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info'); //assigns "contact-info" CSS style to "contactInfo" element

        // Create and add name information
        const nameDiv = document.createElement('div'); //creates div specifically for the contact's name
        nameDiv.classList.add('contact-name');
        nameDiv.textContent = `${this.contactData.firstName || 'No First Name'} ${this.contactData.lastName || 'No Last Name'}`;
        
        // Create and add email information
        const emailDiv = document.createElement('div');
        emailDiv.classList.add('contact-email');
        emailDiv.textContent = this.contactData.email || 'No email provided';

        // Add all elements to contact info container
        contactInfo.appendChild(nameDiv);
        contactInfo.appendChild(emailDiv);

        return contactInfo;
    }
}