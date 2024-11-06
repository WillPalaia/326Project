import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';


export class MainPageComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('MainPageComponent');
    this.hub = EventHub.getInstance();
  }


  render() {

    // Create toggle button
    const title = document.createElement("h1");
    title.id = "title";
    title.textContent = "TrailSafe";
    title.style.zIndex = "1000"; 
    document.body.appendChild(title);

  }

}