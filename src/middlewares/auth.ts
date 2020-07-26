import { Request, Response } from 'express';
import { decode } from '../helpers/jwt';
import { unauthorised } from '../helpers/response';
import { User } from '../models/index';

export const auth = async (req: Request, res: Response, next: () => {}) => {
  const token = req.headers.authorization;

  if (!token) return unauthorised(res, 'Unauthorized Access');

  const user = await decode(token);

  verifyUser(user.id);

  req['user'] = user;
  next();
};

export const verifyUser = (userId: number) => {
  const user = User.findByPk(userId);

  if (user) return true;
  return false;
};
