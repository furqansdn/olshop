import { BadRequest } from '../../utils/AppError.js';

export default (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(new BadRequest(`You are not allowed to perform this action`));
    }

    next();
  };
};
