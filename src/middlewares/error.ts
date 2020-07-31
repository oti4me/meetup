import { Request, Response } from 'express';

/**
 * Returns a not found 404 json respose
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export const notFound = (req: Request, res: Response, next: any) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Application error esponse handle
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: any
) => {
  let statusCode: number;

  if (err['statusCode']) {
    statusCode = err['statusCode'];
  } else if (res.statusCode && res.statusCode === 200) {
    statusCode = 500;
  } else {
    statusCode = res.statusCode || 500;
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    body: statusCode === 422 ? err['fields'] : '',
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};
