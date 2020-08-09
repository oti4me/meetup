import { Request, Response } from 'express';
import { decode } from '../helpers/jwt';
import { Unauthorized } from '../helpers/errors/Unauthorized';
import { UserRepository } from '../repositories/UserRepository';

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
  const user = await new UserRepository().getUser(decoded.id);
  if (!user) return next(new Unauthorized('Unauthorized Access'));

  req['user'] = user;
  return next();
};
