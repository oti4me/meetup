import {
  OK,
  CONFLICT,
  CREATED,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  BAD_REQUEST,
} from 'http-status-codes';
import { Response } from 'express';

/**
 * Returns a json response with status code 409 and a message
 *
 * @param {any} res
 * @param {any} message
 */
export const conflict = (res: Response, message: any) => {
  res.status(CONFLICT).json({
    status_code: CONFLICT,
    message,
  });
};

/**
 * Returns a json response with status code 201 and a reponse body
 *
 * @param {any} res
 * @param {any} body
 */
export const created = (res: Response, body: { [key: string]: any }) => {
  res.status(CREATED).json({
    status_code: CREATED,
    body,
  });
};

/**
 * Returns a json response with status code 422 and a message
 *
 * @param {any} res
 * @param {any} message
 */
export const unporecessed = (res: Response, message: any) => {
  res.status(UNPROCESSABLE_ENTITY).json({
    status_code: UNPROCESSABLE_ENTITY,
    message,
  });
};

/**
 * Returns a json response with status code 200 and a response body
 *
 * @param {any} res
 * @param {any} body
 */
export const ok = (
  res: Response,
  body: { [key: string]: any },
  status: boolean = true
) => {
  const payload = status
    ? {
        status_code: OK,
        body,
      }
    : body;

  res.status(OK).json(payload);
};

/**
 * Returns a json response with status code 404 and a message
 *
 * @param {any} res
 * @param {any} message
 */
export const notFound = (res: Response, message: any) => {
  res.status(NOT_FOUND).json({
    status_code: NOT_FOUND,
    message,
  });
};

/**
 * Returns a json response with status code 400 and a message
 *
 * @param {any} res
 * @param {any} message
 */
export const badRequest = (res: Response, message: any) => {
  res.status(BAD_REQUEST).json({
    status_code: BAD_REQUEST,
    message,
  });
};
