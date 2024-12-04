// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'authentication.sqlite',
});

// Create a new instance of Sequelize
// In this case, we are using SQLite as our database
// and storing the database in memory for testing purposes.
// const sequelize = new Sequelize("sqlite::memory:");

// Define the User model
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "user" }, // Roles: 'user', 'admin'
});

// Create the table if it doesn't exist
await sequelize.sync();

// Export the User model for use in other files
export default User;