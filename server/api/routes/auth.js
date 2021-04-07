import { Router } from 'express';
import { signin, signup } from '../controllers/authController.js';
import catchAsync from '../../utils/catchAsync.js';

const router = Router();

export default (app) => {
  app.use('/auth', router);

  router.post('/signin', catchAsync(signin));
  router.post('/signup', catchAsync(signup));
};
