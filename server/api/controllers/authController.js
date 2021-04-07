import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import { ServerError, HTTPNotFound, BadRequest } from '../../utils/AppError.js';
import config from '../../config/index.js';

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

const sendToken = (user, response, statusCode) => {
  const token = generateToken(user.id);

  user.password = undefined;
  response.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
    token,
  });
};
export const signup = async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    // Dev only
    role,
  });

  // const newUser = undefined;
  if (!newUser) throw new ServerError('No User Created');

  return sendToken(newUser, res, 200);
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new HTTPNotFound('No user with that email address');
  }
  if (!(await user.comparePassword(password, user.password))) {
    throw new BadRequest('Invalid Password');
  }

  sendToken(user, res, 200);
};
