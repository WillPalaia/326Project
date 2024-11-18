import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class GearRecComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('GearRecComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    let container = document.getElementById('mainPageContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mainPageContainer';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; 
    }

    //title
    const title = document.createElement('h1');
    title.id = 'GearRecTitle';
    title.textContent = 'GEAR RECOMMENDATION';
    container.appendChild(title);

    //search input and button
    const searchContainer = document.createElement('div');
    searchContainer.id = 'searchContainer';
    container.appendChild(searchContainer);
    searchContainer.innerHTML = `
      <input id="searchInput" placeholder="Enter Location">
      <button id ="searchButton">Search</button>
    `

    // Fake API URL
    const apiUrl = 'https://mock.yerf.dev/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting weather data');
        }
        return response.json();
      })
      .then((data) => {
        // get location and forecast data
        const location = data.location.toLowerCase();
        const forecasts = data.forecast;

        const forecastContainer = document.createElement('div');
        forecastContainer.id = 'forecastContainer';
        container.appendChild(forecastContainer);

        // Function to render forecasts
        const renderForecasts = (forecastsToDisplay) => {
          forecastContainer.innerHTML = ''; 

          if (forecastsToDisplay.length === 0) {
            forecastContainer.innerHTML = '<p>Location Not Found</p>';
            return;
          }

          forecastsToDisplay.forEach((dayForecast) => {
            const avgTemp = (dayForecast.high + dayForecast.low) / 2;
            const gearRecommendation = this.GearRec(avgTemp);

            const dayElement = document.createElement('div');
            dayElement.classList.add('forecast-day');
            dayElement.innerHTML = `
              <h3>${dayForecast.day}</h3>
              <p>High: ${dayForecast.high}°${data.unit}</p>
              <p>Low: ${dayForecast.low}°${data.unit}</p>
              <p>${dayForecast.description}</p>
              <p>Recommended Gear: ${gearRecommendation}</p>
            `;
            forecastContainer.appendChild(dayElement);
          });
        };

        // Add event listener to search button
        searchButton.addEventListener('click', () => {
          const searchQuery = searchInput.value.toLowerCase().trim();
          // If the search input is empty display nothing
          if (searchQuery === '') {
            forecastContainer.innerHTML = '';  
            return;
          }
          // Check if the location matches the search input
          if (data.location.toLowerCase().includes(searchQuery)) {
            renderForecasts(forecasts); 
          } else {
            renderForecasts([]); 
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }

  // function to recommend based on average temp
  GearRec(avgTemp) {
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
