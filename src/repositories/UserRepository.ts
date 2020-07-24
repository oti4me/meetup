import { User } from '../models/User';
import { comparePassword } from '../helpers/bcrypt';
import { removeKeys } from '../helpers/helpers';

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
        where: { email: userDetails.email },
      });

      if (exists) {
        return [
          null,
          { status: 409, message: 'A user with this email already exists' },
        ];
      }

      let user = await User.create(userDetails);
      user = JSON.parse(JSON.stringify(user));
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

      return [null, { status: 401, message: 'Username or password incorrect' }];
    } catch (error) {
      return [null, error];
    }
  }
}
