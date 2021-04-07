import mongoose from 'mongoose';
import config from '../config/index.js';

export default async () => {
  try {
    const DB = config.database.url
      .replace('<username>', config.database.user)
      .replace('<password>', config.database.password);

    const connection = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    return connection.connection.db;
  } catch (error) {
    throw error;
  }
};
