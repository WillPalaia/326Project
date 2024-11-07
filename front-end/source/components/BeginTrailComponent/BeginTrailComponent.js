import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { GearRecComponent } from '../GearRecComponent/GearRecComponent.js';

export class BeginTrailComponent extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('BeginTrailComponent');
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

        const title = document.createElement("h1");
        title.id = "title2";
        title.textContent = "Begin Trail";
        container.appendChild(title);

        const recommendGearBtn = document.createElement("button")
        recommendGearBtn.id = "gearBtn";
        recommendGearBtn.textContent = "Gear Recommendation";
        container.appendChild(recommendGearBtn);

        recommendGearBtn.addEventListener('click', () => {
            const pageComponent = new GearRecComponent();
            pageComponent.render();
          })
          
        return container
    }
}