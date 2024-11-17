import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { BeginTrailComponent } from '../BeginTrailComponent/BeginTrailComponent.js';
import { AddNewTrailComponent } from '../AddNewTrailComponent/AddNewTrailComponent.js';
import { AboutPageComponent } from '../AboutPageComponent/AboutPageComponent.js';
import { EmergencyContactsInputComponent } from '../EmergencyContactsInputComponent/EmergencyContactsInputComponent.js';
import { EmergencyContactsListComponent } from '../EmergencyContactsListComponent/EmergencyContactsListComponent.js';
import { InsightsComponent } from '../InsightsComponent/InsightsComponent.js';

export class MainPageComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('MainPageComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    // Create or find a specific container for this component's content
    let container = document.getElementById('mainPageContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mainPageContainer';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear any previous content in the container
    }

    // Create and add the title
    const title = document.createElement("h1");
    title.id = "title";
    title.textContent = "TrailSafe";
    container.appendChild(title);

    // Create and add the "Add New Trail" button
    const addTrailBtn = document.createElement("button");
    addTrailBtn.id = "trailBtn";
    addTrailBtn.className = "component-box";
    addTrailBtn.innerHTML = "<span>Add New Trail</span>";
    container.appendChild(addTrailBtn);

    // Create and add the "Begin Trail" button
    const beginTrailBtn = document.createElement("button");
    beginTrailBtn.id = "beginBtn";
    beginTrailBtn.className = "component-box";
    beginTrailBtn.innerHTML = "<span>Begin Trail</span>";
    container.appendChild(beginTrailBtn);

    // Create and add the "About" button
    const aboutPageBtn = document.createElement("button");
    aboutPageBtn.id = "aboutBtn";
    aboutPageBtn.className = "component-box";
    aboutPageBtn.innerHTML = "<span>About TrailSafe</span>";
    container.appendChild(aboutPageBtn);

    // Create and add the "Insights" button
    const insightsPageBtn = document.createElement("button");
    insightsPageBtn.id = "insightsBtn";
    insightsPageBtn.className = "component-box";
    insightsPageBtn.innerHTML = "<span>Insights</span>";
    container.appendChild(insightsPageBtn);

    // Create and add the "Emergency Contacts" button
    const emergencyContactsBtn = document.createElement("button");
    emergencyContactsBtn.id = "emergencyContactsBtn";
    emergencyContactsBtn.className = "component-box";
    emergencyContactsBtn.innerHTML = "<span>Emergency Contacts</span>";
    container.appendChild(emergencyContactsBtn);

    // Event Listeners
    // Adding event listener to "Begin Trail"
    beginTrailBtn.addEventListener('click', () => {
      const pageComponent = new BeginTrailComponent();
      pageComponent.render();
    });

    addTrailBtn.addEventListener('click', () => {
      const pageComponent = new AddNewTrailComponent();
      pageComponent.render();
    });

    aboutPageBtn.addEventListener('click', () => {
      const pageComponent = new AboutPageComponent();
      console.log("rendering About");
      pageComponent.render();
    });

    emergencyContactsBtn.addEventListener('click', () => {
      // Clears container all content from container element
      container.innerHTML = '';

      // Create title for the emergency contacts page
      const pageTitle = document.createElement("h2");
      pageTitle.textContent = "Emergency Contacts";
      container.appendChild(pageTitle);

      // Create and render input component
      const inputComponent = new EmergencyContactsInputComponent();
      container.appendChild(inputComponent.render());

      // Create and render list component
      const listComponent = new EmergencyContactsListComponent();
      container.appendChild(listComponent.render());
    });

    insightsPageBtn.addEventListener('click', () => {
      const pageComponent = new InsightsComponent();
      pageComponent.render();
    });

    return container;
  }
}