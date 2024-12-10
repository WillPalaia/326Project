import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { TaskRepositoryService } from "../../services/TaskRepositoryService.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class AllTrailComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS("AllTrailComponent");
    this.trailLogService = new TaskRepositoryService();
    this.hub = EventHub.getInstance();
    this.trails = [];

    // Listen for TrailAdded event
    this.hub.subscribe("TrailAdded", (newTrail) => {
      this.trails.push(newTrail);
      this.updateUI(); // Update UI when a new trail is added
    });
  }

  async fetchTrails() {
    try {
      this.trails = await this.trailLogService.loadTasksFromDB(); // Fetch all stored trails
      this.trails.sort((a, b) => a.order - b.order); // Sort trails by the `order` field
      console.log("Fetched and sorted trails:", this.trails);
    } catch (error) {
      console.error("Error fetching trails:", error);
    }
  }

  async removeTrail(trailId) {
    try {
      await this.trailLogService.deleteTask(trailId); // Remove trail from database
      this.trails = this.trails.filter((trail) => trail.id !== trailId); // Remove from local array
      this.updateUI(); // Re-render UI
    } catch (error) {
      console.error("Error removing trail:", error);
    }
  }

  async moveTrailToTop(trailId) {
    try {
      const trailIndex = this.trails.findIndex((trail) => trail.id === trailId);
      if (trailIndex > -1) {
        const [selectedTrail] = this.trails.splice(trailIndex, 1); // Remove the selected trail
        this.trails.unshift(selectedTrail); // Add it to the beginning of the list

        // Persist the new order
        await this.trailLogService.updateTrailOrder(this.trails);

        this.updateUI(); // Re-render UI
      }
    } catch (error) {
      console.error("Error updating trail order:", error);
    }
  }

  updateUI() {
    const container = this.createContainer();
    this.populateContainer(container);
  }

  createContainer() {
    let container = document.getElementById("mainPageContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "mainPageContainer";
      document.body.appendChild(container);
    } else {
      container.innerHTML = ""; // Clear previous content
    }
    container.classList.add("view-all-trails-container");
    return container;
  }

  populateContainer(container) {
    const title = document.createElement("h2");
    title.textContent = "All Trails";
    container.appendChild(title);

    const trailList = document.createElement("ul");
    trailList.className = "trail-list";

    if (this.trails.length === 0) {
      const noTrailsMessage = document.createElement("p");
      noTrailsMessage.className = "no-trails-message";
      noTrailsMessage.textContent = "No trails found.";
      container.appendChild(noTrailsMessage);
    } else {
      this.trails.forEach((trail) => {
        const listItem = document.createElement("li");
        listItem.className = "trail-list-item";

        const trailDetails = document.createElement("div");
        trailDetails.innerHTML = `
          <strong>Trail Name:</strong> ${trail.trailName}<br />
          <strong>From:</strong> ${trail.fromLocation}<br />
          <strong>To:</strong> ${trail.toLocation}
        `;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const beginButton = document.createElement("button");
        beginButton.textContent = "Begin Trail";
        beginButton.className = "begin-trail-button";
        beginButton.addEventListener("click", () => {
          alert(`Your trip "${trail.trailName}" is now running on the Current Trip page.`);
          this.moveTrailToTop(trail.id);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-trail-button";
        removeButton.addEventListener("click", () => this.removeTrail(trail.id));

        buttonContainer.appendChild(beginButton);
        buttonContainer.appendChild(removeButton);

        listItem.appendChild(trailDetails);
        listItem.appendChild(buttonContainer);
        trailList.appendChild(listItem);
      });
    }

    container.appendChild(trailList);
  }

  async render() {
    await this.fetchTrails();
    const container = this.createContainer();
    this.populateContainer(container);
    return container;
  }
}
