import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { AddNewTrailComponent } from '../AddNewTrailComponent/AddNewTrailComponent.js';
import { AboutPageComponent } from '../AboutPageComponent/AboutPageComponent.js';
import { AddPersonalTrailComponent } from '../PersonalTrailComponent/PersonalTrailComponent.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';
import { CurrentTripComponent } from '../CurrentTripComponent/CurrentTripComponent.js';

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

    // Create and add the "Gear Recommendations" button
    const gearRecBtn = document.createElement("button");
    gearRecBtn.id = "gearRecBtn";
    gearRecBtn.className = "component-box";
    gearRecBtn.innerHTML = "<span>Gear Recommendations</span>";
    container.appendChild(gearRecBtn);

    // Create and add the "About" button
    const aboutPageBtn = document.createElement("button");
    aboutPageBtn.id = "aboutBtn";
    aboutPageBtn.className = "component-box";
    aboutPageBtn.innerHTML = "<span>About TrailSafe</span>";
    container.appendChild(aboutPageBtn);

    // Create and add the "Insights" button
    const personalPageBtn = document.createElement("button");
    personalPageBtn.id = "personalBtn";
    personalPageBtn.className = "component-box";
    personalPageBtn.innerHTML = "<span>Personal Trail</span>";
    container.appendChild(personalPageBtn);

    //// Create and add the "Current Trip" button
    //const currentTripBtn = document.createElement("button");
    //currentTripBtn.id = "currentTripBtn";
    //currentTripBtn.className = "component-box";
    //currentTripBtn.innerHTML = "<span>Current Trip</span>";
    //container.appendChild(currentTripBtn);

    // Event Listeners
    // Adding event listener to "Begin Trail"
    gearRecBtn.addEventListener('click', () => {
      const pageComponent = new GearRecComponent();
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

    //currentTripBtn.addEventListener('click', () => {
    //  const pageComponent = new CurrentTripComponent();
    //  pageComponent.render();
    //});

    personalPageBtn.addEventListener('click', () => {
      const pageComponent = new AddPersonalTrailComponent();
      pageComponent.render();
    });

    return container;
  }
}
