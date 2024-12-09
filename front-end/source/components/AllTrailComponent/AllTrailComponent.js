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
      noTrailsMessage.textContent = "No trails found.";
      container.appendChild(noTrailsMessage);
    } else {
      this.trails.forEach((trail) => {
        const listItem = document.createElement("li");
        listItem.className = "trail-list-item";

        // Add trail details
        listItem.innerHTML = `
          <div>
            <strong>Trail Name:</strong> ${trail.trailName}<br />
            <strong>From:</strong> ${trail.fromLocation}<br />
            <strong>To:</strong> ${trail.toLocation}
          </div>
        `;

        // Add Begin Trail Button
        const beginButton = document.createElement("button");
        beginButton.textContent = "Begin Trail";
        beginButton.className = "begin-trail-button";
        beginButton.addEventListener("click", () => {
          alert(`Starting trail: ${trail.trailName}`);
        });

        listItem.appendChild(beginButton);
        trailList.appendChild(listItem);
      });
    }

    container.appendChild(trailList);
    return container;
  }
}
