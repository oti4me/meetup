import { Request } from 'express';
import { NOT_FOUND, UNAUTHORIZED, OK, CONFLICT } from 'http-status-codes';
import { Group, User } from '../models/index';
import { exists } from 'fs';

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

  /**
   * Updates a group
   *
   * @param {{ [key: string]: any }} groupData
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async update({ id, user_id, name }: { [key: string]: any }) {
    try {
      const group = await Group.findByPk(id);

      if (group) {
        if (group.user_id === user_id) {
          group.update({ name });
          group.reload();
          return [group, null];
        }

        return [
          null,
          {
            status: UNAUTHORIZED,
            message: 'Not authorised to update this group',
          },
        ];
      }
      return [null, { status: NOT_FOUND, message: 'Group not found' }];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Deletes a user's group
   *
   * @param {Request} req
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async delete(req: Request) {
    try {
      const group = await Group.findByPk(req.params.groupId);
      if (group) {
        if (group.user_id === req['user'].id) {
          group.destroy();
          return [
            {
              status: OK,
              message: 'Group deleted',
            },
            null,
          ];
        }
        return [
          null,
          {
            status: UNAUTHORIZED,
            message: 'Not authorised to delete this group',
          },
        ];
      }
      return [null, { status: NOT_FOUND, message: 'Group not found' }];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Adds users to groups
   *
   * @param {Request} req
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async addUser(req: Request) {
    try {
      const { groupId, id } = req.params;
      const group = await Group.findByPk(groupId);

      if (group) {
        if (group.user_id !== req['user'].id)
          return [
            null,
            {
              status: UNAUTHORIZED,
              message: 'Not authorised',
            },
          ];

        if (req['user'].id === parseInt(id))
          return [
            null,
            {
              status: CONFLICT,
              message: 'Cannot add group admin to group',
            },
          ];

        const users = await group.getUsers();
        const exists = users.find((user) => user.id === parseInt(id));

        if (exists)
          return [
            null,
            {
              status: CONFLICT,
              message: 'User alread a member of this group',
            },
          ];

        const user = await User.findByPk(id);

        if (user) {
          group.addUsers(user);
          return [{ message: 'User added to group' }, null];
        }
        return [
          null,
          {
            status: NOT_FOUND,
            message: 'User not found',
          },
        ];
      }
      return [null, { status: NOT_FOUND, message: 'Group not found' }];
    } catch (error) {
      return [null, error];
    }
  }
}
