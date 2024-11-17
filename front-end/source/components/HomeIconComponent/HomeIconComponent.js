import { EventHub } from '../../eventhub/EventHub.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';


export class HomeIconComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('HomeIconComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    // Check if the home icon already exists
    let homeIcon = document.getElementById("homeIcon");
    if (homeIcon) return;

    // Create the home icon button
    homeIcon = document.createElement("button");
    homeIcon.id = "homeIcon";
    homeIcon.textContent = "🏠"; // Unicode home icon
    homeIcon.style.position = "fixed";
    homeIcon.style.right = "10px";
    homeIcon.style.top = "10px";
    homeIcon.style.zIndex = "1000";
    homeIcon.style.cursor = "pointer";

    // Add click event to navigate to the Home page
    homeIcon.addEventListener("click", () => {
      this.hub.publish("NavigateToPage", "Home");
    });

    document.body.appendChild(homeIcon);

    return homeIcon;
  }
}
