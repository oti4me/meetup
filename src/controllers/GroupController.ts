import { Request, Response } from 'express';
import { GroupRepository } from '../repositories/GroupRepository';
import { created, ok } from '../helpers/response';

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
   *+
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public update = async (req: Request, res: Response, next: (error) => {}) => {
    const [group, error] = await this.groupRepo.update(req.body);
    if (error) return next(error);

    return ok(res, group);
  };

  /**
   * Deletes a user group
   *
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public delete = async (req: Request, res: Response, next: (error) => {}) => {
    const [result, error] = await this.groupRepo.delete(req);
    if (error) return next(error);

    return ok(res, { message: result.message });
  };

  /**
   * Adds a user to a group
   *
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public addUser = async (req: Request, res: Response, next: (error) => {}) => {
    const [userGroup, error] = await this.groupRepo.addUser(req);
    if (error) return next(error);

    return created(res, await userGroup);
  };

  /**
   * Removes a user from a group
   *
   * @param {Request} req
   * @param {Response} res
   * @param {(error: Error) => {}} next
   * @returns
   *
   * @memberOf ChatController
   */
  public removeUser = async (
    req: Request,
    res: Response,
    next: (error) => {}
  ) => {
    const [userGroup, error] = await this.groupRepo.removeUser(req);
    if (error) return next(error);

    return ok(res, await userGroup);
  };
}
