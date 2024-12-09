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
      this.render(); // Update UI when a new trail is added
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
      this.render(); // Re-render UI
    } catch (error) {
      console.error("Error removing trail:", error);
    }
  }

  async render() {
    await this.fetchTrails();

    let container = document.getElementById("mainPageContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "mainPageContainer";
      document.body.appendChild(container);
    } else {
      container.innerHTML = ""; // Clear previous content
    }

    container.classList.add("view-all-trails-container");

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
    return container;
  }
}