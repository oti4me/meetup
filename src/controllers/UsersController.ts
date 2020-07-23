import { Request, Response } from 'express';
import { CONFLICT, UNAUTHORIZED } from 'http-status-codes';
import { UserRepository } from '../repositories/UserRepository';
import { created, conflict, unauthorised, ok } from '../helpers/response';

export class UsersController {
  /**
   * User repo instance variable
   *
   * @private
   * @type {UserRepository}
   * @memberOf UsersController
   */
  private userRepo: UserRepository;

  /**
   * Creates an instance of UsersController.
   *
   * @memberOf UsersController
   */
  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * Creates a use account
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   *
   * @memberOf UsersController
   */
  public signup = async (
    req: Request,
    res: Response,
    next: (error: any) => {}
  ) => {
    const [user, error] = await this.userRepo.signup(req.body);
    if (error) {
      return error.status && error.status == CONFLICT
        ? conflict(res, error.message)
        : next(error);
    }

    return created(res, user);
  };

  /**
   * Signs a use into the application
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   *
   * @memberOf UsersController
   */
  public signin = async (
    req: Request,
    res: Response,
    next: (error: any) => {}
  ) => {
    const [user, error] = await this.userRepo.signin(req.body);
    if (error) {
      return error.status && error.status == UNAUTHORIZED
        ? unauthorised(res, error.message)
        : next(error);
    }

    return ok(res, user);
  };
}
