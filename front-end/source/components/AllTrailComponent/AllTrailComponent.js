import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class ViewAllTrailsComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS("ViewAllTrailsComponent"); // Load the CSS file for styling
    this.trails = [];
  }

  async fetchTrails() {
    try {
      const response = await fetch("/v1/trails"); // Fetch trails from the backend API
      if (!response.ok) {
        throw new Error("Failed to fetch trails");
      }
      this.trails = await response.json();
    } catch (error) {
      console.error("Error fetching trails:", error);
    }
  }

  async render() {
    // Fetch trails from the database
    await this.fetchTrails();

    let container = document.getElementById("mainPageContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "mainPageContainer";
      document.body.appendChild(container);
    } else {
      container.innerHTML = "";
    }

    container.classList.add("view-all-trails-container");

    // Add a title
    const title = document.createElement("h2");
    title.textContent = "All Trails";
    container.appendChild(title);

    // Add the list of trails
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
        listItem.textContent = `Trail Name: ${trail.trailName}, From: ${trail.fromLocation}, To: ${trail.toLocation}, Distance: ${trail.distance}`;
        trailList.appendChild(listItem);
      });
    }

    container.appendChild(trailList);
    return container;
  }
}
