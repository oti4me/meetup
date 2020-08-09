import { Request } from 'express';
import { Op } from 'sequelize';
import { Group, User } from '../models/index';
import { Unauthorized } from '../helpers/errors/Unauthorized';
import { NotFound } from '../helpers/errors/NotFound';
import { Conflict } from '../helpers/errors/Conflict';
import { BadRequest } from '../helpers/errors/BadRequest';
import { pick } from '../helpers/helpers';

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
      const exists = await Group.findOne({
        where: { name: groupData.name },
      });

      if (exists) {
        return [null, new Conflict('Group with this name already exists')];
      }

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

        return [null, new Unauthorized('Not authorised to update this group')];
      }
      return [null, new NotFound('Group not found')];
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
          return [{ message: 'Group deleted' }, null];
        }
        return [null, new Unauthorized('Not authorised to delete this group')];
      }
      return [null, new NotFound('Group not found')];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Performs users to groups database opreation
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
          return [null, new Unauthorized('Not authorised')];

        const users = await group.getUsers();
        const exists = users.find((user) => user.id === parseInt(id));
        if (exists) return [null, new Conflict('User alread in this group')];

        let user: User = await User.findByPk(id);
        if (user) {
          group.addUsers(user);
          return [{ message: 'User added to group' }, null];
        }
        return [null, new NotFound('User not found')];
      }
      return [null, new NotFound('Group not found')];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Performs remove user database opreation
   *
   * @param {Request} req
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async removeUser(req: Request) {
    try {
      const { groupId, id } = req.params;
      const group = await Group.findByPk(groupId);
      if (group) {
        if (group.user_id !== req['user'].id)
          return [null, new Unauthorized('Not authorised')];

        if (group.user_id === parseInt(id))
          return [
            null,
            new BadRequest('Cannot remove yourself from this group'),
          ];

        const users = await group.getUsers();
        const groupUser = users.find((user) => user.id === parseInt(id));
        if (!groupUser)
          return [null, new NotFound('User not a member of this this group')];

        group.removeUser(groupUser);
        return [{ message: 'User removed from group' }, null];
      }
      return [null, new NotFound('Group not found')];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Perform database operation to get a user's group
   *
   * @param {User} user
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async getGroups(user: User) {
    try {
      const groups = await user.getGroups();
      if (groups.length === 0)
        return [
          null,
          new NotFound('User has not created or added to a group!!'),
        ];

      const groupIds = pick(groups, 'id');
      const groupsWithUsers = await Group.findAll({
        where: {
          id: { [Op.in]: groupIds },
        },
        include: {
          model: User,
          required: true,
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
      });

      return [groupsWithUsers, null];
    } catch (error) {
      return [null, error];
    }
  }
}
