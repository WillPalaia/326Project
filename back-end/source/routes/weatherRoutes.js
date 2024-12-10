import express from "express";
import WeatherController from "../controller/WeatherController.js";


class WeatherRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create
    this.router.post("/weather", WeatherController.createWeather.bind(WeatherController));
    console.log("weather routes")
    
    // Read (all and by id)
    this.router.get("/weather", async(req,res) => {
      const {latitude, longitude} = req.query
      await WeatherController.getWeather(req,res)
    })
    
    this.router.delete("/weather", async (req,res)=> {
      await WeatherController.deleteWeather(req,res)
    })
  }

  getRouter() {
    return this.router;
  }
}

export default new WeatherRoutes().getRouter();

