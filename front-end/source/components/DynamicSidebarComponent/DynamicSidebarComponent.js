import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';


export class DynamicSidebarComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('DynamicSidebarComponent');
    this.hub = EventHub.getInstance();
  }


  render() {
    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    toggleButton.textContent = "☰";
    toggleButton.style.position = "fixed";  // Keep button fixed on the page
    toggleButton.style.left = "10px";       // Position outside the sidebar
    toggleButton.style.top = "10px";        // Consistent top margin
    toggleButton.style.zIndex = "1000"; 
    document.body.appendChild(toggleButton);


    // Create sidebar
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.style.zIndex = 1000
    document.body.appendChild(sidebar);


    // Sidebar content structure
    const sidebarTitle = document.createElement("h2");
    sidebarTitle.textContent = "TrailSafe";
    sidebar.appendChild(sidebarTitle);


    // Save reference to sidebar content paragraph
    this.sidebarContent = document.createElement("p");
    this.sidebarContent.id = "sidebarContent";
    this.sidebarContent.textContent = "Click on items below to update this content.";
    sidebar.appendChild(this.sidebarContent);


    const sidebarItems = document.createElement("ul");
    sidebarItems.id = "sidebarItems";
    sidebar.appendChild(sidebarItems);


    // Create sidebar items
    const items = ["Home", "Profile", "Friends", "Settings"];
    items.forEach(item => {
      const button = document.createElement("button");
      button.textContent = item;

      // Publish event to navigate to a new page on button click
      button.onclick = () => {

        this.hub.publish("NavigateToPage", item); // Publish the event with item as data
      
      };
      sidebarItems.appendChild(button);
    });


    // Toggle sidebar visibility
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      toggleButton.textContent = sidebar.classList.contains("open") ? "✖" : "☰";
    });
  }
}
