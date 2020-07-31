import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { created, ok } from '../helpers/response';
import { encode } from '../helpers/jwt';

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
    if (error) return next(error);

    const [token, err] = await encode(user);
    if (err) return next(error);

    return created(res, { token });
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
    if (error) return next(error);

    const [token, err] = await encode(user);
    if (err) return next(error);

    return ok(res, { token });
  };
}
