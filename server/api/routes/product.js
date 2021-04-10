import { Router } from 'express';

import catchAsync from '../../utils/catchAsync.js';
import upload from '../middleware/uploadMiddleware.js';
import authProtect from '../middleware/authProtect.js';
import restrictTo from '../middleware/restrictTo.js';
import {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} from '../controllers/productController.js';

const router = new Router();

export default (app) => {
  app.use('/products', router);

  router
    .route('/')
    .get(catchAsync(getAll))
    .post(
      catchAsync(authProtect),
      restrictTo('admin'),
      upload.single('image'),
      catchAsync(create)
    );
  router
    .route('/:id')
    .get(catchAsync(getOne))
    .patch(
      catchAsync(authProtect),
      restrictTo('admin'),
      upload.single('image'),
      catchAsync(update)
    )
    .delete(
      catchAsync(authProtect),
      restrictTo('admin'),
      catchAsync(deleteOne)
    );
};
