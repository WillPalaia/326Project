import InMemoryWeatherModel from "./InMemoryWeatherModel.js";
import SQLiteWeatherModel from "./SQLiteWeatherModel.js";

class _WeatherModelFactory {
  async getModel(model = "sqlite") {
    if (model === "sqlite") {
      return SQLiteWeatherModel;
    } else if (model === "sqlite-fresh") {
      await SQLiteWeatherModel.init(true); 
      return SQLiteWeatherModel;
    } else {
      return InMemoryWeatherModel; 
    }
  }
}

const WeatherModelFactory = new _WeatherModelFactory();
export default WeatherModelFactory;