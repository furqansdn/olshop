import cors from 'cors';
import bodyParser from 'body-parser';

import config from '../config/index.js';
import routes from '../api/index.js';

import { HTTPNotFound, AppError } from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import authProtect from '../api/middleware/authProtect.js';

export default (app) => {
  /**
   * Check status
   */
  app.get('/status', catchAsync(authProtect), (req, res, next) => {
    res.status(200).json({ message: 'bismillah', user: req.currentUser });
  });

  /**
   * untuk mengaktifkan cors
   */
  app.use(cors());

  /**
   * Parse JSON
   */
  app.use(bodyParser.json({ limit: '10mb' }));

  /**
   * Load Router
   */

  app.use(config.api.prefix, routes());

  /**
   * Catch Error ketika route tidak ditemukan
   */
  app.use((req, res, next) => {
    throw new HTTPNotFound(`Page ${req.originalUrl} is not found`);
  });

  /**
   * Global Error handler
   */
  app.use((err, req, res, next) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        errors: err,
      });
    }

    return res.status(500).json({
      message: err.message,
      errors: err,
    });
  });
};
