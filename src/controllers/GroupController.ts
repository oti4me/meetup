import { Request, Response } from 'express';
import { GroupRepository } from '../repositories/GroupRepository';
import { created } from '../helpers/response';

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
    try {
      const [group, error] = await this.groupRepo.create(req.body);

      if (error) return next(error);

      return created(res, group);
    } catch (error) {
      return next(error);
    }
  };
}
