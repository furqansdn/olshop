import { Router } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import auth from '../middleware/authProtect.js';
import {
  create,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} from '../controllers/categoryController.js';
const router = new Router();
export default (app) => {
  app.use('/category', router);

  router
    .route('/')
    .get(catchAsync(auth), catchAsync(getAll))
    .post(catchAsync(auth), catchAsync(create));

  router
    .route('/:id')
    .get(catchAsync(auth), catchAsync(getOne))
    .patch(catchAsync(auth), catchAsync(updateOne))
    .delete(catchAsync(auth), catchAsync(deleteOne));
};
