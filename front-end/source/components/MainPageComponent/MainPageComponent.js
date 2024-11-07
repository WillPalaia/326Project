import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { BeginTrailComponent } from '../BeginTrailComponent/BeginTrailComponent.js';


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
    addTrailBtn.textContent = "Add New Trail";
    container.appendChild(addTrailBtn);

    // Create and add the "Add New Trail" button
    const beginTrailBtn = document.createElement("button");
    beginTrailBtn.id = "beginBtn";
    beginTrailBtn.textContent = "Begin Trail";
    container.appendChild(beginTrailBtn);

    // adding event listener to " Begin Trail"
    beginTrailBtn.addEventListener('click', () => {
      const pageComponent = new BeginTrailComponent();
      pageComponent.render();
    })

    return container;
  }
}