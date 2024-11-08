import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';

export class AddNewTrailComponent extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('AddNewTrailComponent');
        this.hub = EventHub.getInstance();
        this.trailNameInput = null;
        this.trailImageInput = null;
        this.trailImagePreview = null;
        this.fromLocationInput = null;
        this.toLocationInput = null;
        this.distanceInfo = null;
        this.distanceDisplay = null;
    }

    render() {
        let container = document.getElementById('mainPageContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'mainPageContainer';
            document.body.appendChild(container);
        } else {
            container.innerHTML = '';
        }

        container.classList.add('add-new-trail-container');

    
        // Trail Name Input
        const trailNameDiv = document.createElement('div');
        trailNameDiv.className = 'trail-name';
        trailNameDiv.textContent = 'Trail Name:';
        container.appendChild(trailNameDiv);

        this.trailNameInput = document.createElement('input');
        this.trailNameInput.type = 'text';
        this.trailNameInput.placeholder = 'Enter trail name';
        container.appendChild(this.trailNameInput);

        // Trail Image Input
        const trailImageDiv = document.createElement('div');
        trailImageDiv.className = 'trail-image';
        trailImageDiv.textContent = 'Trail Image:';
        container.appendChild(trailImageDiv);

        this.trailImageInput = document.createElement('input');
        this.trailImageInput.type = 'file';
        this.trailImageInput.accept = 'image/*';
        this.trailImageInput.addEventListener('change', this.handleImageUpload.bind(this));
        container.appendChild(this.trailImageInput);

        this.trailImagePreview = document.createElement('img');
        this.trailImagePreview.className = 'trail-image-preview';
        container.appendChild(this.trailImagePreview);

        // Display Weather Button
        const displayWeatherButton = document.createElement('button');
        displayWeatherButton.textContent = 'Display Weather';
        displayWeatherButton.className = 'display-weather-button';
        displayWeatherButton.addEventListener('click', this.displayWeatherHandler.bind(this));
        container.appendChild(displayWeatherButton);

        // From Location Input
        const fromLocationDiv = document.createElement('div');
        fromLocationDiv.className = 'from-location-input';
        fromLocationDiv.textContent = 'From Location:';
        container.appendChild(fromLocationDiv);

        this.fromLocationInput = document.createElement('input');
        this.fromLocationInput.type = 'text';
        this.fromLocationInput.placeholder = 'Enter starting location';
        container.appendChild(this.fromLocationInput);

        // To Location Input
        const toLocationDiv = document.createElement('div');
        toLocationDiv.className = 'to-location-input';
        toLocationDiv.textContent = 'To Location:';
        container.appendChild(toLocationDiv);

        this.toLocationInput = document.createElement('input');
        this.toLocationInput.type = 'text';
        this.toLocationInput.placeholder = 'Enter destination location';
        container.appendChild(this.toLocationInput);

        // Calculate Distance Button
        const calculateDistanceButton = document.createElement('button');
        calculateDistanceButton.textContent = 'Calculate Distance';
        calculateDistanceButton.className = 'calculate-distance-button';
        calculateDistanceButton.addEventListener('click', this.calculateDistanceHandler.bind(this));
        container.appendChild(calculateDistanceButton);

        // Distance Info Display
        this.distanceDisplay = document.createElement('div');
        this.distanceDisplay.className = 'distance-display';
        container.appendChild(this.distanceDisplay);

        // Add Trail Button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Add Trail';
        submitButton.className = 'submit-button';
        submitButton.addEventListener('click', this.addTrail.bind(this));
        container.appendChild(submitButton);
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.trailImagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    async calculateDistanceHandler() {
        const fromLocation = this.fromLocationInput.value;
        const toLocation = this.toLocationInput.value;
        this.distanceInfo = await this.calculateDistance(fromLocation, toLocation);
        this.distanceDisplay.textContent = `Distance: ${this.distanceInfo}`;
    }

    async addTrail() {
        const trailName = this.trailNameInput.value;
        const fromLocation = this.fromLocationInput.value;
        const toLocation = this.toLocationInput.value;

        this.distanceInfo = await this.calculateDistance(fromLocation, toLocation);

        console.log(`Trail Name: ${trailName}`);
        console.log(`Distance from ${fromLocation} to ${toLocation}: ${this.distanceInfo}`);
    }

    async calculateDistance(from, to) {
        return '10 km';
    }
}
