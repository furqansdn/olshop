import express from 'express';
import config from './config/index.js';
import expressLoader from './loaders/index.js';
const startServer = async () => {
  const app = express();

  await expressLoader({ expressApp: app });
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
};

startServer();
