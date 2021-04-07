import { Router } from 'express';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';

export default () => {
  const app = Router();

  authRoutes(app);
  categoryRoutes(app);
  return app;
};
