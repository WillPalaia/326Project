import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class DarkModeToggleComponent extends BaseComponent {
  constructor() {
    super();
    this.hub = EventHub.getInstance();
    this.loadCSS('DarkModeToggleComponent');
  }

  render() {
    // Check if the toggle switch container already exists
    let container = document.getElementById("darkModeToggleContainer");
    if (container) return;

    // Create the container for the "Dark Mode" text and toggle switch
    container = document.createElement('div');
    container.id = 'darkModeToggleContainer';
    container.classList.add('dark-mode-toggle-container');

    // Create the "Dark Mode" text
    const label = document.createElement('span');
    label.textContent = "Dark Mode";
    label.classList.add('dark-mode-label');

    // Create the dark mode toggle switch (checkbox)
    const toggle = document.createElement("input");
    toggle.id = "darkModeToggle";
    toggle.type = "checkbox";
    toggle.classList.add("dark-mode-toggle");

    // Load the dark mode state from localStorage
    this.loadDarkModeState(toggle);

    // Add event listener
    toggle.addEventListener("change", () => {
      this.hub.publish("DarkModeToggled", toggle.checked);
      this.updateLabelColor(label);
      this.saveDarkModeState(toggle.checked);
    });

    const switchLabel = document.createElement('label');
    switchLabel.setAttribute('for', 'darkModeToggle');
    switchLabel.classList.add('toggle-label');
    container.appendChild(label);
    container.appendChild(toggle);
    container.appendChild(switchLabel);

    document.body.appendChild(container);
    this.updateLabelColor(label);

    return container;
  }

  updateLabelColor(label) {
    if (document.body.classList.contains('dark-mode')) {
      label.style.color = 'white';
    } else {
      label.style.color = 'black';
    }
  }

  saveDarkModeState(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
  }

  loadDarkModeState(toggle) {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      document.body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  }
}