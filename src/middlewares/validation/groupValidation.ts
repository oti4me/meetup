import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { unporecessed } from '../../helpers/response';

export const groupValidation = {
  /**
   * Checks for validation result, returns next of successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {() => {}} next
   * @returns
   */
  createGroupValidationResult: (
    req: Request,
    res: Response,
    next: () => {}
  ) => {
    const { name } = req.body;
    const { id } = req['user'];
    const result = validationResult(req);

    if (!result.isEmpty()) return unporecessed(res, result.array());

    req.body = { name, user_id: id };

    return next();
  },

  createGroupValidator: [
    check('name')
      .optional(false)
      .isLength({ min: 4, max: 20 })
      .withMessage('Name must be at 4-20 chars long'),
  ],
};
