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
      console.log("Fetched trails:", this.trails);
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
        await this.trailLogService.updateTrailOrder(this.trails); // Persist updated order
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
    // Add a title
    const title = document.createElement("h2");
    title.textContent = "All Trails";
    container.appendChild(title);

    // Create the list of trails
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

        // Create trail details div
        const trailDetails = document.createElement("div");
        trailDetails.innerHTML = `
          <strong>Trail Name:</strong> ${trail.trailName}<br />
          <strong>From:</strong> ${trail.fromLocation}<br />
          <strong>To:</strong> ${trail.toLocation}
        `;

        // Create button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        // Add Begin Trail Button
        const beginButton = document.createElement("button");
        beginButton.textContent = "Begin Trail";
        beginButton.className = "begin-trail-button";
        beginButton.addEventListener("click", () => {
          alert(`Starting trail: ${trail.trailName}`);
          this.moveTrailToTop(trail.id); // Move the trail to the top of the list
        });

        // Add "X" Button
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-trail-button";
        removeButton.addEventListener("click", () => this.removeTrail(trail.id));

        // Append buttons to container
        buttonContainer.appendChild(beginButton);
        buttonContainer.appendChild(removeButton);

        // Append details and button container to list item
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
