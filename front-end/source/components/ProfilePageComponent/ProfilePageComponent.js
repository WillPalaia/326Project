import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class ProfilePageComponent extends BaseComponent {
    constructor() {
      super();
      this.loadCSS('ProfilePageComponent');
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
        title.id = "title3";
        title.textContent = "Profile";
        title.style.zIndex = "1000"; 
        container.appendChild(title);
    
        return container;
      }
    }