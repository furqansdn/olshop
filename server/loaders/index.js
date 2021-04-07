import expressLoader from './express.js';
import logger from './logger.js';
import mongoose from './mongoose.js';

export default async ({ expressApp }) => {
  /**
   * Load Mongoose Connection
   */
  await mongoose();
  logger.info('DB Loaded Successfully');

  /**
   * Express Middleware
   */
  expressLoader(expressApp);
  logger.info('All Middleware Loaded Successfully');
};
