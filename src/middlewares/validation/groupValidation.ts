import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
// import { unporecessed } from '../../helpers/response';
import { Unprocessed } from '../../helpers/errors/Unprocessed';
import { ValidationError } from '../../helpers/errors/ValidationError';

export const groupValidation = {
  /**
   * Checks creation validation result, returns next of successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {() => {}} next
   * @returns
   */
  createGroupValidationResult: (req: Request, res: Response, next) => {
    const { name } = req.body;
    const { id } = req['user'];
    const result = validationResult(req);

    if (!result.isEmpty()) return next(new ValidationError(result.array()));

    req.body = { name, user_id: id };

    return next();
  },

  /**
   * Checks update validation result, returns next of successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {} next
   * @returns
   */
  updateGroupValidationResult: (req: Request, res: Response, next) => {
    const { name } = req.body;
    const { id } = req['user'];
    const { groupId } = req.params;
    const result = validationResult(req);

    if (!result.isEmpty()) return next(new ValidationError(result.array()));

    req.body = { name, user_id: id, id: groupId };

    return next();
  },

  createGroupValidator: [
    check('name')
      .optional(false)
      .isLength({ min: 4, max: 64 })
      .withMessage('Name must be at 4-64 chars long'),
  ],
};
