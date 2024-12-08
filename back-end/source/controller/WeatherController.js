import WeatherService from "../service/WeatherService.js";
import WeatherModelFactory from "../model/WeatherModelFactory.js";

class WeatherController {
  constructor() {
    WeatherModelFactory.getModel().then((model) => {
      this.model = model;
    })
  }

  async createWeather(req, res) {
    try {
      const { latitude, longitude} = req.body

      if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude, longitude are required." });
      }

      // Fetch weather data from the external API
      const weatherData = await WeatherService.fetchWeatherData(latitude, longitude);
      if (!weatherData) {
        return res.status(503).json({ error: "Unable to fetch weather data from external service." });
      }

      // Combine user input with weather data
      const weatherEntry = {
        latitude,
        longitude,
        temperature_max: weatherData.daily?.temperature_2m_max?.[0],
        temperature_min: weatherData.daily?.temperature_2m_min?.[0],
        description: weatherData.daily?.weather_code?.[0]
      };

      weatherData.description = weatherData.daily?.weather_code?.[0]

      const entry = await this.model.create(weatherEntry);
      return res.status(201).json(weatherData);
    } catch (error) {
      console.error("Error in createWeather:", error);
      return res
        .status(500)
        .json({ error: "Failed to create Weather. Please try again" });
    }
  }

  async getWeather(req, res) {
    console.log("get weather")
    const weatherData = await this.model.read()
    res.json({weatherData})
  }

  async deleteWeather(req, res) {
    await this.model.delete()
    res.json(await this.model.read())
  }
}

export default new WeatherController();
