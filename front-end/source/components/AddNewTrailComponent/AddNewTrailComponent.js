import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { TrailLogService } from "../../services/TrailLogService.js";
import { MainPageComponent } from "../MainPageComponent/MainPageComponent.js";
import { Events } from "../../eventhub/Events.js";

export class AddNewTrailComponent extends BaseComponent {
    constructor() {
        super();
        this.loadCSS("AddNewTrailComponent");
        this.hub = EventHub.getInstance();
        this.trailLogService = new TrailLogService();
        this.trailData = [];
        this.trailImageUrl = "";
        this.mapImageContainer = null; // Store reference to the map container
    }

    render() {
        let container = document.getElementById("mainPageContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "mainPageContainer";
            document.body.appendChild(container);
        } else {
            container.innerHTML = "";
        }

        container.classList.add("add-new-trail-container");

        // Header Section
        const header = document.createElement("div");
        header.className = "header";

        const headerTitle = document.createElement("h2");
        headerTitle.className = "header-title";
        headerTitle.textContent = "Add Your New Trail";

        header.appendChild(headerTitle);
        container.appendChild(header);

        // Trail Name Input
        const trailNameDiv = document.createElement("div");
        trailNameDiv.className = "trail-name";
        trailNameDiv.textContent = "Trail Name:";
        container.appendChild(trailNameDiv);

        this.trailNameInput = document.createElement("input");
        this.trailNameInput.type = "text";
        this.trailNameInput.placeholder = "Enter trail name";
        container.appendChild(this.trailNameInput);

        // Trail Image Input
        this.trailImageInput = document.createElement("input");
        this.trailImageInput.type = "file";
        this.trailImageInput.accept = "image/*";
        this.trailImageInput.addEventListener("change", this.handleImageUpload.bind(this));
        container.appendChild(this.trailImageInput);

        this.trailImagePreview = document.createElement("img");
        this.trailImagePreview.className = "trail-image-preview";
        container.appendChild(this.trailImagePreview);

        // From Location Input
        const fromLocationDiv = document.createElement("div");
        fromLocationDiv.className = "from-location-input";
        fromLocationDiv.textContent = "From Location:";
        container.appendChild(fromLocationDiv);

        this.fromLocationInput = document.createElement("input");
        this.fromLocationInput.type = "text";
        this.fromLocationInput.placeholder = "Enter starting location";
        container.appendChild(this.fromLocationInput);

        // To Location Input
        const toLocationDiv = document.createElement("div");
        toLocationDiv.className = "to-location-input";
        toLocationDiv.textContent = "To Location:";
        container.appendChild(toLocationDiv);

        this.toLocationInput = document.createElement("input");
        this.toLocationInput.type = "text";
        this.toLocationInput.placeholder = "Enter destination location";
        container.appendChild(this.toLocationInput);

        // Calculate Distance Button
        const calculateDistanceButton = document.createElement("button");
        calculateDistanceButton.textContent = "Calculate Distance";
        calculateDistanceButton.className = "calculate-distance-button";
        calculateDistanceButton.addEventListener("click", this.calculateDistanceHandler.bind(this));
        container.appendChild(calculateDistanceButton);

        // Distance Info Display
        this.distanceDisplay = document.createElement("div");
        this.distanceDisplay.className = "distance-display";
        container.appendChild(this.distanceDisplay);

        // Add Trail Button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Add Trail";
        submitButton.className = "submit-button";
        submitButton.addEventListener("click", this.addTrail.bind(this)); // Save trail using TrailLogService
        container.appendChild(submitButton);

        // Success Message Display
        this.successMessage = document.createElement("div");
        this.successMessage.className = "success-message";
        this.successMessage.style.display = "none";
        container.appendChild(this.successMessage);

        const mapImage = document.createElement("img");
        mapImage.src = "https://www.groovypost.com/wp-content/uploads/2020/11/my-maps3.jpg";
        mapImage.alt = "Map Image";
        mapImage.className = "map-image";
        container.appendChild(mapImage);

        // New Feature: Show List of Trails
        this.addTrailListSection(container);

        return container;
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.trailImagePreview.src = e.target.result;
                this.trailImageUrl = e.target.result;
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

    async calculateDistance(from, to) {
        return "10 km"; // Replace with a real API if available
    }

    async addTrail() {
        const trailName = this.trailNameInput.value;
        const fromLocation = this.fromLocationInput.value;
        const toLocation = this.toLocationInput.value;

        if (!trailName || !fromLocation || !toLocation) {
            this.showErrorMessage("Please fill out all the fields to add the trail.");
            return;
        }

        const distance = await this.calculateDistance(fromLocation, toLocation);

        const trailData = {
            trailName,
            fromLocation,
            toLocation,
            distance,
        };

        try {
            await this.trailLogService.storeTrail(trailData); // Save to backend
            this.showSuccessMessage(`Trail "${trailName}" added successfully!`);
            this.clearForm();
        } catch (error) {
            console.error("Error adding trail:", error);
            this.showErrorMessage("Failed to save the trail. Please try again.");
        }
    }

    showSuccessMessage(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = "block";
        setTimeout(() => {
            this.successMessage.style.display = "none";
        }, 3000);
    }

    showErrorMessage(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = "block";
        setTimeout(() => {
            this.successMessage.style.display = "none";
        }, 3000);
    }

    clearForm() {
        this.trailNameInput.value = "";
        this.fromLocationInput.value = "";
        this.toLocationInput.value = "";
        this.trailImageInput.value = "";
        this.trailImagePreview.src = "";
        this.distanceDisplay.textContent = "";
        this.trailImageUrl = "";
    }
}
