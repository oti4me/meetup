import { Request, Response } from 'express';
import { CONFLICT } from 'http-status-codes';
import { UserRepository } from '../repositories/UserRepository';
import { created, conflict } from '../helpers/response';

export class UsersController {
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
}
