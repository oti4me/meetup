import { Op } from 'sequelize';
import { User } from '../models/index';
import { comparePassword } from '../helpers/bcrypt';
import { removeKeys } from '../helpers/helpers';
import { Unauthorized } from '../helpers/errors/Unauthorized';
import { Conflict } from '../helpers/errors/Conflict';

export class UserRepository {
  /**
   * Adds a user account details to the database
   *
   * @param {*} userDetails
   * @returns
   *
   * @memberOf UserRepository
   */
  public async signup(userDetails: any) {
    try {
      const exists = await User.findOne({
        where: {
          [Op.or]: [
            { email: userDetails.email },
            { username: userDetails.username },
          ],
        },
      });

      if (exists) {
        if (exists.email === userDetails.email) {
          return [
            null,
            new Conflict(
              `A user with the email '${userDetails.email}' already exists`
            ),
          ];
        }
        if (exists.username === userDetails.username) {
          return [
            null,
            new Conflict(
              `A user with the username '${userDetails.username}' already exists`
            ),
          ];
        }
      }

      const user = (await User.create(userDetails)).toJSON();
      removeKeys(user, ['password', 'createdAt', 'updatedAt']);
      return [user, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Signs in a registered user
   *
   * @param {*} userDetails
   * @returns
   *
   * @memberOf UserRepository
   */
  public async signin(userDetails: any) {
    try {
      const user = await User.findOne({
        where: { email: userDetails.email },
        raw: true,
        nest: true,
      });

      if (user && comparePassword(user.password, userDetails.password)) {
        removeKeys(user, ['password', 'createdAt', 'updatedAt']);
        return [user, null];
      }

      return [null, new Unauthorized('Username or password incorrect')];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Gets a user  object for the provided id
   *
   * @param {number} userId
   *
   * @returns {User}
   */
  public getUser = async (userId: number) => {
    return await User.findByPk(userId);
  };
}
