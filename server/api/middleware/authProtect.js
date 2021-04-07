import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

import { BadRequest } from '../../utils/AppError.js';
import User from '../../models/User.js';

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    if (secret) {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return reject(err);
        }
        if (typeof decoded === 'object') {
          return resolve(decoded);
        }
      });
    }
  });
};

export default async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new BadRequest('Your are not authenticated');
  }

  const decode = await verifyToken(token, config.jwt.secret);

  if (!decode) {
    throw new BadRequest('False Token');
  }

  const user = await User.findById(decode.id);

  if (!user) {
    throw new BadRequest('User with this token no longer exist');
  }

  req.currentUser = user;
  next();
};
