import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { TaskRepositoryService } from "../../services/TaskRepositoryService.js";

export class AddNewTrailComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS("AddNewTrailComponent");
    this.hub = EventHub.getInstance();
    this.trailLogService = new TaskRepositoryService(); // Use the TaskRepositoryService for data storage
    this.trailImageUrl = "";
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

    // Add Trail Button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Add Trail";
    submitButton.className = "submit-button";
    submitButton.addEventListener("click", this.addTrail.bind(this));
    container.appendChild(submitButton);

    // Map
    const mapImage = document.createElement("img");
    mapImage.src = "https://www.groovypost.com/wp-content/uploads/2020/11/my-maps3.jpg";
    mapImage.alt = "Map Image";
    mapImage.className = "map-image";
    container.appendChild(mapImage);

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

  async addTrail() {
    const trailName = this.trailNameInput.value;
    const fromLocation = this.fromLocationInput.value;
    const toLocation = this.toLocationInput.value;

    if (!trailName || !fromLocation || !toLocation) {
      alert("Please fill out all the fields to add the trail.");
      return;
    }

    const trailData = {
      trailName,
      fromLocation,
      toLocation,
      imageUrl: this.trailImageUrl,
    };

    try {
      await this.trailLogService.storeTask(trailData);
      this.hub.publish("TrailAdded", trailData); // Notify other components
      alert(`Trail "${trailName}" added successfully!`);
      this.clearForm();
    } catch (error) {
      console.error("Error adding trail:", error);
      alert("Failed to save the trail. Please try again.");
    }
  }

  clearForm() {
    this.trailNameInput.value = "";
    this.fromLocationInput.value = "";
    this.toLocationInput.value = "";
    this.trailImageInput.value = "";
    this.trailImagePreview.src = "";
    this.trailImageUrl = "";
  }
}
