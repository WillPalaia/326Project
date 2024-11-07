import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { TaskComponent } from '../TaskComponent/TaskComponent.js';

export class GearRecComponent extends BaseComponent {
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

    const forecastContainer = document.createElement('div');
    forecastContainer.id = 'forecastContainer';
    container.appendChild(forecastContainer);

    const apiUrl = 'https://mock.yerf.dev/';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('hi')
        const location = document.createElement("h2");
        console.log('hi2')
        location.textContent = `Location: ${data.location}`;
        forecastContainer.appendChild(location);

        // Display each day's forecast
        data.forecast.forEach(dayForecast => {
          const dayElement = document.createElement('div');
          dayElement.classList.add('forecast-day');
          
          dayElement.innerHTML = `
            <h3>${dayForecast.day}</h3>
            <p>High: ${dayForecast.high}°${data.unit}</p>
            <p>Low: ${dayForecast.low}°${data.unit}</p>
            <p>${dayForecast.description}</p>
          `;
          
          forecastContainer.appendChild(dayElement);
        })
    })
    
    const title = document.createElement("h1");
    title.id = "title2";
    title.textContent = "Gear recommendation page works!";
    container.appendChild(title);
  }
}
