import { EventHub } from '../../eventhub/EventHub.js';
import { DynamicSidebarComponent } from '../DynamicSidebarComponent/DynamicSidebarComponent.js';
import { MainPageComponent } from '../MainPageComponent/MainPageComponent.js';
import { ProfilePageComponent } from '../ProfilePageComponent/ProfilePageComponent.js';
import { SettingsPageComponent } from '../SettingsPageComponent/SettingsPageComponent.js';
import { FriendsPageComponent } from '../FriendsPageComponent/FriendsPageComponent.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';

export class AppControllerComponent {
  #container = null;
  #hub = null;
  #dynamicSidebarComponent = null;
  #viewContainer = null;
  #GearRecComponent = null;

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#dynamicSidebarComponent = new DynamicSidebarComponent();
    this.#GearRecComponent = new GearRecComponent();
  }

  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();
    this.#dynamicSidebarComponent.render();

    // Render Home page initially
    this.#renderPage('Home');

    // Append container to body or specific parent
    document.body.appendChild(this.#container);

    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('app-controller');
  }

  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="viewContainer"></div>
    `;
    this.#viewContainer = this.#container.querySelector('#viewContainer');
  }

  #attachEventListeners() {
    // Listen for navigation events from the sidebar
    this.#hub.subscribe("NavigateToPage", (page) => {
      this.#renderPage(page);
    });
  }

  #renderPage(page) {
    // Clear previous content
    this.#viewContainer.innerHTML = '';

    let pageComponent;
    switch (page) {
      case 'Home':
        pageComponent = new MainPageComponent();
        break;
      case 'Profile':
        pageComponent = new ProfilePageComponent();
        break;
      case 'Settings':
        pageComponent = new SettingsPageComponent();
        break;
      case 'Friends':
        pageComponent = new FriendsPageComponent();
        break;
      default:
        pageComponent = new MainPageComponent(); // Default to Home
    }

    // Append the selected page component
    this.#viewContainer.appendChild(pageComponent.render());
  }
}