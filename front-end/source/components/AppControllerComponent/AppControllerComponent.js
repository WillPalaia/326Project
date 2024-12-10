import { EventHub } from '../../eventhub/EventHub.js';
import { DynamicSidebarComponent } from '../DynamicSidebarComponent/DynamicSidebarComponent.js';
import { MainPageComponent } from '../MainPageComponent/MainPageComponent.js';
import { ProfilePageComponent } from '../ProfilePageComponent/ProfilePageComponent.js';
import { FriendsPageComponent } from '../FriendsPageComponent/FriendsPageComponent.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';
import { HomeIconComponent } from '../HomeIconComponent/HomeIconComponent.js';
import { CurrentTripComponent } from '../CurrentTripComponent/CurrentTripComponent.js';
import { DarkModeToggleComponent } from '../DarkModeToggleComponent/DarkModeToggleComponent.js';
import { LoginPageComponent } from '../LoginPageComponent/LoginPageComponent.js';
import { AllTrailComponent } from '../AllTrailComponent/AllTrailComponent.js';

export class AppControllerComponent {
  #container = null;
  #hub = null;
  #dynamicSidebarComponent = null;
  #homeIconComponent = null;
  #darkModeToggleComponent = null;
  #viewContainer = null;

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#dynamicSidebarComponent = new DynamicSidebarComponent();
    this.#homeIconComponent = new HomeIconComponent();
    this.#darkModeToggleComponent = new DarkModeToggleComponent();
  }

  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();
    this.#dynamicSidebarComponent.render();
    this.#homeIconComponent.render();
    this.#darkModeToggleComponent.render();

    // Render the Home page initially
    this.#renderPage('Home');

    // Append container to body or specific parent
    document.body.appendChild(this.#container);

    // Apply saved dark mode preference
    this.#applyDarkMode();

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

  async #renderPage(page) {
    // Clear previous content
    this.#viewContainer.innerHTML = '';

    let pageComponent;
    switch (page) {
      case 'Login':
        pageComponent = new LoginPageComponent();
        break;
      case 'Home':
        pageComponent = new MainPageComponent();
        break;
      case 'Profile':
        pageComponent = new ProfilePageComponent();
        break;
      case 'Friends':
        pageComponent = new FriendsPageComponent();
        break;
      case 'Trails':
        pageComponent = new AllTrailComponent();
        await pageComponent.fetchTrails(); // Ensure asynchronous logic is complete
        break;
      case 'CurrentTrip':
        pageComponent = new CurrentTripComponent();
        break;
      default:
        pageComponent = new MainPageComponent(); // Default to Home
    }

    // Ensure `render` returns a Node
    const renderedPage = await pageComponent.render();
    if (renderedPage instanceof Node) {
      this.#viewContainer.appendChild(renderedPage);
    } else {
      console.error('Rendered content is not a valid Node:', renderedPage);
    }
  }

  #attachEventListeners() {
    // Listen for navigation events from the sidebar
    this.#hub.subscribe('NavigateToPage', (page) => {
      this.#renderPage(page);
    });

    this.#hub.subscribe('DarkModeToggled', () => {
      const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDarkModeEnabled); // Persist the state
    });
  }

  #applyDarkMode() {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (isDarkModeEnabled) {
      document.body.classList.add('dark-mode');
    }
  }
}
