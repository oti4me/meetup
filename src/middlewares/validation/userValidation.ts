import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { Unprocessed } from '../../helpers/errors/Unprocessed';
import { ValidationError } from '../../helpers/errors/ValidationError';

export const userValidation = {
  /**
   * Checks for validation result, returns next of successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {() => {}} next
   * @returns
   */
  signupValidationResult: (req: Request, res: Response, next) => {
    const { firstName, lastName, email, username, phone, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) return next(new ValidationError(result.array()));

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
      .isLength({ min: 4, max: 64 })
      .withMessage('Password must be at 4-64 chars long'),
    check('username')
      .optional(false)
      .isLength({ min: 2, max: 25 })
      .withMessage('Usernane must be at 3-25 chars long'),
    check('firstName')
      .optional(false)
      .isLength({ min: 3, max: 25 })
      .withMessage('firstNane must be at 3-25 chars long'),
    check('lastName')
      .optional(false)
      .isLength({ min: 3, max: 25 })
      .withMessage('lastNane must be at least 3-25 chars long'),
    check('email').isEmail().withMessage('Invalid email provided'),
    check('phone')
      .optional(true)
      .isMobilePhone('en-NG')
      .withMessage('Invalid mobile number provided'),
  ],

  /**
   * Checks for signin validation result and return next if successful
   *
   * @param {Request} req
   * @param {Response} res
   * @param {() => {}} next
   * @returns
   */
  signinValidationResult: (req: Request, res: Response, next) => {
    const { email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return next(new ValidationError(result.array()));
    }

    req.body = { email, password };

    return next();
  },

  signinValidation: [
    check('password')
      .optional(false)
      .isLength({ min: 4, max: 64 })
      .withMessage('Password must be at 4-64 chars long'),
    check('email').optional(false).isEmail().withMessage('Invalid email'),
  ],
};
