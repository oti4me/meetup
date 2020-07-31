import { OK, CREATED } from 'http-status-codes';
import { Response } from 'express';

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
