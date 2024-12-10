import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "weather.sqlite",
});

const Weather = sequelize.define("weather", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // Changed from UUIDV4 since we're using INTEGER
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // Better way to handle default timestamp
  },
});

class _SQLiteWeatherModel {
  constructor() {
    this.initialized = false;
  }

  async init(fresh = false) {
    if (!this.initialized) {
      await sequelize.authenticate();
      await sequelize.sync({ force: fresh });  // Only force if fresh is true
      
      if (fresh) {
        await this.delete();
        await this.create({
          longitude: 10,
          latitude: 10,
          description: "Initial weather record"  // Fixed NULL to string
        });
      }
      
      this.initialized = true;
    }
  }

  async create(data) {
    if (!this.initialized) await this.init();
    return await Weather.create(data);
  }

  async read(id = null) {
    if (!this.initialized) await this.init();
    if (id) {
      return await Weather.findByPk(id);
    }
    return await Weather.findAll();
  }

  async update(id, updatedData) {
    if (!this.initialized) await this.init();
    const weather = await Weather.findByPk(id);
    if (!weather) return null;
    return await weather.update(updatedData);
  }

  async delete(id = null) {
    if (!this.initialized) await this.init();
    if (id) {
      const weather = await Weather.findByPk(id);
      if (!weather) return null;
      await weather.destroy();
      return weather;
    }
    await Weather.destroy({ where: {} });
    return [];
  }
}

const SQLiteWeatherModel = new _SQLiteWeatherModel();

export default SQLiteWeatherModel;