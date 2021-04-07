import { Router } from 'express';

import catchAsync from '../../utils/catchAsync';

const router = new Router();

export default (app) => {
  app.use('/product', router);

  router.route('/').get();
};
