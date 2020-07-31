import { Request, Response } from 'express';
import { decode } from '../helpers/jwt';
import { Unauthorized } from '../helpers/errors/Unauthorized';
import { User } from '../models/index';

/**
 * Protects routes that requires authentitcation
 *
 * @param {Request} req
 * @param {Response} res
 * @param {() => {}} next
 *
 * @returns
 */
export const auth = async (req: Request, res: Response, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new Unauthorized('Unauthorized Access'));

  const [decoded, error] = await decode(token);
  if (error) return next(error);
  const user = await verifyUser(decoded.id);
  if (!user) return next(new Unauthorized('Unauthorized Access'));

  req['user'] = user;
  return next();
};

/**
 * Verify user for provided token
 *
 * @param {number} userId
 *
 * @returns {User}
 */
export const verifyUser = async (userId: number) => {
  return await User.findByPk(userId);
};
