import { Router } from 'express';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';

export default () => {
  const app = Router();

  authRoutes(app);
  categoryRoutes(app);
  productRoutes(app);
  return app;
};
