// DB Conection
// Import MODELS to use in APPs

import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

// ### Import MODEL
import Files from '../app/models/File';
import User from '../app/models/User';

// ### Models Array
const models = [User, Files];

// Class
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // ### Models Array
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
