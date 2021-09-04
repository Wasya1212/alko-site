const mongoose = require('mongoose');

const createDatabaseConnection = async (onConnected, onDisconnected) => {
  try {
    mongoose.connection.on('connected', onConnected);
    mongoose.connection.on('disconnected', onDisconnected);

    return await mongoose.connect('mongodb://localhost:27017/webui', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = createDatabaseConnection;