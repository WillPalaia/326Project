import { BaseComponent } from '../BaseComponent/BaseComponent.js';


export class DynamicSidebarComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('DynamicSidebarComponent');
  }


  // Method to update sidebar content
  updateSidebarContent(content) {
    this.sidebarContent.textContent = `You selected: ${content}`;
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
    const items = ["Home", "Profile", "Settings", "Friends"];
    items.forEach(item => {
      const button = document.createElement("button");
      button.textContent = item;
      button.onclick = () => this.updateSidebarContent(item);
      sidebarItems.appendChild(button);
    });


    // Toggle sidebar visibility
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      toggleButton.textContent = sidebar.classList.contains("open") ? "✖" : "☰";
    });
  }
}
