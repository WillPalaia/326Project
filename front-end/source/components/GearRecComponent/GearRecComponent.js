import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { TaskComponent } from '../TaskComponent/TaskComponent.js';

export class GearRecComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('GearRecComponent');
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

    const title = document.createElement("h1");
    title.id = "GearRecTitle";
    title.textContent = "Gear recommendation";
    container.appendChild(title);

    const apiUrl = 'https://mock.yerf.dev/';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const location = document.createElement("h2");
        location.textContent = `Location: ${data.location}`;
        forecastContainer.appendChild(location);

        // Display each day's forecast
        data.forecast.forEach(dayForecast => {
          const dayElement = document.createElement('div');
          dayElement.classList.add('forecast-day');
          const avgTemp = (dayForecast.high + dayForecast.low) / 2;
          const gearRecommendation = this.GearRec(avgTemp);
          
          dayElement.innerHTML = `
            <h3>${dayForecast.day}</h3>
            <p>High: ${dayForecast.high}°${data.unit}</p>
            <p>Low: ${dayForecast.low}°${data.unit}</p>
            <p>${dayForecast.description}</p>
            <p>Recommended Gear: ${gearRecommendation}</p>
          `;
          
          forecastContainer.appendChild(dayElement);
        })
    })
  }

  GearRec(avgTemp){
    if (avgTemp < 40) {
      return 'Winter coat, gloves, and hat';
    } else if (avgTemp >= 40 && avgTemp < 60) {
      return 'Light jacket or sweater';
    } else if (avgTemp >= 60 && avgTemp < 80) {
      return 'T-shirt and shorts';
    } else {
      return 'Light, breathable clothing like a tank top and shorts';
    }
  }
}