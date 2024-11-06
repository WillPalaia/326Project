import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { TaskComponent } from '../TaskComponent/TaskComponent.js';

export class GearRecommendationComponent extends BaseComponent {
    #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS('GearRecommendationComponent');
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    return this.#container;
  }


  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('gearRecommendation');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Recommendation page works!</h2>
    `;
  }
}