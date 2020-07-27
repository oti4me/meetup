import { Group } from '../models/index';

export class GroupRepository {
  constructor() {}

  /**
   * Creates a use group
   *
   * @param {{ [key: string]: any }} groupData
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async create(groupData: { [key: string]: any }) {
    try {
      const group = await Group.create(groupData);
      return [group, null];
    } catch (error) {
      return [null, error];
    }
  }
}
