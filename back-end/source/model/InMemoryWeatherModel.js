class _InMemoryWeatherModel {

  constructor() {
    this.weatherData = [];
  }

  async create(data) {
    data.id = _InMemoryWeatherModel.weatherDataid++;
    const entry = { id, ...data, createdAt: new Date() };
    this.weatherData.push(entry);
    return entry;
  }

  async read(id = null) {
    if (id) {
      return this.weatherData.find((entry) => entry.id === id);
    }
    return this.weatherData;
  }

  async update(id, updatedData) {
    const index = this.weatherData.findIndex((entry) => entry.id === id);
    this.weatherData[index] = { ...this.weatherData[index], ...updatedData };
    return this.weatherData[index];
  }

  async delete(id = null) {
    if (id) {
      const index = this.weatherData.findIndex((entry) => entry.id === id);
      if (index === -1) return null;
      const [deletedEntry] = this.weatherData.splice(index, 1);
      return deletedEntry;
    }
    this.weatherData = [];
    return
  }
}

const InMemoryWeatherModel = new _InMemoryWeatherModel()

export default InMemoryWeatherModel;