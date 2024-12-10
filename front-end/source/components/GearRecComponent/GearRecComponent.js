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
      <input id="latitudeInput" placeholder="Enter Latitude">
      <input id="longitudeInput" placeholder="Enter longitude">
      <button id ="searchButton">Search</button>
    `
    const forecastContainer = document.createElement('div');
    forecastContainer.id = 'forecastContainer';
    container.appendChild(forecastContainer);

    const searchButton = document.getElementById('searchButton')
    const latitudeInput = document.getElementById('latitudeInput')
    const longitudeIput = document.getElementById('longitudeInput')
    
    // Add event listener to search button
    searchButton.addEventListener('click', async () => {
      const latitude = latitudeInput.value.trim()
      const longitude = longitudeIput.value.trim()

      if( !latitude || !longitude){
        forecastContainer.innerHTM = ``
        return
      }

      try {
        const data = await this.getWeatherData(latitude, longitude)
        forecastContainer.innerHTML = ``

        // getting relevant JSON fields
        const time = data.daily.time
        const temperature_2m_max = data.daily.temperature_2m_max
        const temperature_2m_min = data.daily.temperature_2m_min
        const weather_code = data.daily.weather_code
        console.log(data)
        time.forEach((day, index) => {
          const high = temperature_2m_max[index]
          const low = temperature_2m_min[index]
          const avgTemp = (high + low)/2
          const gearRecommendation = this.gearRec(avgTemp)
          const dayElement = document.createElement('div');
          dayElement.classList.add('forecast-day');
          dayElement.innerHTML = `
            <h3>${day}</h3>
            <p>High: ${high}°F</p>
            <p>Low: ${low}°F</p>
            <p>Weather Code: ${weather_code[index]}</p>
            <p>Recommended Gear: ${gearRecommendation}</p>
          `;
          forecastContainer.appendChild(dayElement);
        })
      } 
      catch (error){
        console.error('Error fetching weather data:', error);
      }
    });
  }

  //fetching weatehr data from API
  async getWeatherData(latitude, longitude){
   const apiUrl = `http://localhost:3000/v1/weather/`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({latitude: `${latitude}`, longitude: `${longitude}`})
      });
      if(!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  // function to recommend based on average temp
  gearRec(avgTemp) {
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
