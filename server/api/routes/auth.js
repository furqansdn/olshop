import { Router } from 'express';

const router = Router();

export default (app) => {
  app.use('/auth', router);

  router.post('/signin', (req, res) => {
    res.status(200).json({
      message: `Berhasi ${req.originalUrl}`,
      body: req.body,
    });
  });
};
