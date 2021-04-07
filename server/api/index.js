import { Router } from 'express';
import authRoutes from './routes/auth.js';

export default () => {
  const app = Router();

  authRoutes(app);
  return app;
};
