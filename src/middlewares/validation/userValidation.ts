import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { unporecessed } from '../../helpers/response';

export const userValidation = {
  /**
   * Checks for validation result, returns next of successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {() => {}} next
   * @returns
   */
  signupValidationResult: (req: Request, res: Response, next: () => {}) => {
    const { firstName, lastName, email, username, phone, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) return unporecessed(res, result.array());

    req.body = {
      firstName,
      lastName,
      email,
      username,
      phone,
      password,
    };

    return next();
  },

  signupValidator: [
    check('password')
      .optional(false)
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be at 4-20 chars long'),
    check('username')
      .optional(false)
      .isLength({ min: 2, max: 25 })
      .withMessage('Usernane must be at 3-25 chars long'),
    check('firstName')
      .optional(false)
      .isLength({ min: 3, max: 25 })
      .withMessage('Usernane must be at 3-25 chars long'),
    check('lastName')
      .optional(false)
      .isLength({ min: 3, max: 25 })
      .withMessage('Usernane must be at least 3-25 chars long'),
    check('email').isEmail().withMessage('Invalid email provided'),
    check('phone')
      .optional(true)
      .isMobilePhone('en-NG')
      .withMessage('Invalid mobile number provided'),
  ],

  signinValidationResult: (req: Request, res: Response, next: () => {}) => {
    const { email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) return unporecessed(res, result.array());

    req.body = { email, password };

    return next();
  },

  signinValidation: [
    check('password')
      .optional(false)
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be at 4-20 chars long'),
    check('email').optional(false).isEmail().withMessage('Invalid email'),
  ],
};
