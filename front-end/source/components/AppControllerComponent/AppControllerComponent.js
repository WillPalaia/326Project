import { TaskListComponent } from '../TaskListComponent/TaskListComponent.js';
import { SimpleTaskListViewComponent } from '../SimpleTaskListViewComponent/SimpleTaskListViewComponent.js';
import { TaskInputComponent } from '../TaskInputComponent/TaskInputComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { DynamicSidebarComponent } from '../DynamicSidebarComponent/DynamicSidebarComponent.js';
import { MainPageComponent } from '../MainPageComponent/MainPageComponent.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = 'main'; // Track the current view ('main' or 'simple')
  #taskListComponent = null; // Instance of the main task list component
  #taskInputComponent = null; // Instance of the task input component
  #simpleTaskListViewComponent = null; // Instance of the simple view component
  #hub = null; // EventHub instance for managing events
  #dynamicSidebarComponent = null;
  #mainPageComponent = null;
  #GearRecComponent = null;

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#taskListComponent = new TaskListComponent();
    this.#taskInputComponent = new TaskInputComponent();
    this.#simpleTaskListViewComponent = new SimpleTaskListViewComponent();
    this.#dynamicSidebarComponent = new DynamicSidebarComponent();
    this.#mainPageComponent = new MainPageComponent();
    this.#GearRecComponent = new GearRecComponent();
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    this.#taskInputComponent.render();
    this.#taskListComponent.render();
    this.#simpleTaskListViewComponent.render();
    this.#dynamicSidebarComponent.render();

    // Initially render the main view
    this.#renderCurrentView();

    return this.#container;
  }

  // Creates the main container element
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('app-controller');
  }

  // Sets up the HTML structure for the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="viewContainer"></div>
      <button id="switchViewBtn">Switch to Simple View</button>
      <div id="GearRec"></div>
      <button id="rec_Button">Gear Recommendation </button>
    `;
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    const switchViewBtn = this.#container.querySelector('#switchViewBtn');
    const rec_Button = this.#container.querySelector('#rec_Button')

    rec_Button.addEventListener('click', () => {
      this.#toggleRecView();
    })

    this.#hub.subscribe('SwitchToGearRecView', () => {
      this.#currentView = 'rec'
      this.#renderCurrentView();
    })

    // Event listener for switching views
    switchViewBtn.addEventListener('click', () => {
      this.#toggleView();
    });

    // Subscribe to events from the EventHub to manage switching
    this.#hub.subscribe('SwitchToSimpleView', () => {
      this.#currentView = 'simple';
      this.#renderCurrentView();
    });

    this.#hub.subscribe('SwitchToMainView', () => {
      this.#currentView = 'main';
      this.#renderCurrentView();
    });

    // Listen for navigation events
    this.#hub.subscribe("NavigateToPage", (page) => {
      this.#navigateToPage(page);
    });

    this.sub
  }

  #toggleRecView(){
    if (this.#currentView === 'main'){
      this.#currentView = 'rec'
      this.#hub.publish('SwitchToGearRecView', null);
    }else {
      this.#currentView = 'main'
      this.#hub.publish('SwitchToMainView', null);
    }
  }

  // Toggles the view between main and simple
  #toggleView() {
    if (this.#currentView === 'main') {
      this.#currentView = 'simple';
      this.#hub.publish('SwitchToSimpleView', null);
    } else {
      this.#currentView = 'main';
      this.#hub.publish('SwitchToMainView', null);
    }
  }

  // New method to handle page navigation
  #navigateToPage(page) {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = ''; // Clear existing content
    if (page === "Home") {
      this.#currentView = 'main';
      this.#mainPageComponent.render();
    }
    if (page === "Profile") {
      this.#currentView = 'profile';
      const pageContent = document.createElement("div");
      pageContent.innerHTML = `<h1>${page} Page</h1><p>Content for ${page} page goes here2.</p>`;
      viewContainer.appendChild(pageContent);
    }
    if (page === "Friends") {
      this.#currentView = 'friends';
      const pageContent = document.createElement("div");
      pageContent.innerHTML = `<h1>${page} Page</h1><p>Content for ${page} page goes here3.</p>`;
      viewContainer.appendChild(pageContent);
    }
    if (page === "Settings") {
      this.#currentView = 'settings';
      const pageContent = document.createElement("div");
      pageContent.innerHTML = `<h1>${page} Page</h1><p>Content for ${page} page goes here4</p>`;
      viewContainer.appendChild(pageContent);
    }
    
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = ''; // Clear existing content

    // Update the button text for the main/simple toggle button
    const switchViewBtn = this.#container.querySelector('#switchViewBtn');
    switchViewBtn.textContent = this.#currentView === 'main' ? 'Switch to Simple View' : 'Switch to Main View';

    if (this.#currentView === 'main') {
      // Render the main task list view
      viewContainer.appendChild(this.#taskInputComponent.render());
      viewContainer.appendChild(this.#taskListComponent.render());
    } else if (this.#currentView === 'simple') {
      // Render the simple task list view
      viewContainer.appendChild(this.#simpleTaskListViewComponent.render());
    } else if (this.#currentView === 'rec') {
      // Render the gear recommendation view
      viewContainer.appendChild(this.#GearRecComponent.render());

    }
  }
}
