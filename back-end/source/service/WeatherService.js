const weatherCodeDescriptions = {
  0: "Clear Skies",
  1: "Clear skies",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog and depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: dese intensity",
  61: "Rain: Slight",
  63: "Rain: Moderate",
  65: "Rain: Heavy",
  66: "freezing Rain: Light",
  67: "freezing Rain: Heavy",
  71: "Snow Fall: slight",
  73: "Snow Fall: modererate",
  75: "Snow Fall: Heavy",
  77: "Snow grains",
  80: "Rain showers: slight",
  81: "Rain Showers: moderate",
  82: "Rain Showers: Violent",
  85: "Snow Showers: slight",
  86: "snow Showers: Heavy",
  95: "Thunderstorm: slight or moderate",
  96: "Thunderstorm with slight and heavy hail",
  99: "Thunderstorm with slight and heavy hail"
};

class WeatherService {
  static async fetchWeatherData(latitude, longitude) {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=0&temperature_unit=fahrenheit&daily=temperature_2m_max,temperature_2m_min,weather_code`;
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error("Failed to fetch weather data.");
          }
          const data = await response.json();

          // Map weather codes to descriptions
          if (data.daily && data.daily.weather_code) {
              data.daily.weather_code = data.daily.weather_code.map(
                  code => weatherCodeDescriptions[code] || "Unknown weather"
              );
          }

          return data;
      } catch (error) {
          console.error("WeatherService error:", error);
          return null;
      }
  }
}

export default WeatherService