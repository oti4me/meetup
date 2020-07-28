import { Request, Response } from 'express';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { GroupRepository } from '../repositories/GroupRepository';
import { created, ok } from '../helpers/response';
import { notFound, unauthorised } from '../helpers/response';

export class GroupController {
  private groupRepo: GroupRepository;

  /**
   * Creates an instance of ChatController.
   *
   * @memberOf ChatController
   */
  constructor() {
    this.groupRepo = new GroupRepository();
  }

  /**
   * Creates a user group
   *
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public create = async (req: Request, res: Response, next: (error) => {}) => {
    const [group, error] = await this.groupRepo.create(req.body);

    if (error) return next(error);

    return created(res, group);
  };

  /**
   * Updates a user group
   *
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public update = async (req: Request, res: Response, next: (error) => {}) => {
    const [group, error] = await this.groupRepo.update(req.body);

    if (error) {
      if (error.status === NOT_FOUND) return notFound(res, error.message);
      if (error.status === UNAUTHORIZED)
        return unauthorised(res, error.message);
      return next(error);
    }

    return ok(res, { message: 'Group updated', group });
  };
}
