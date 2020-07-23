import { User } from '../models/User';
import { comparePassord } from '../helpers/bcrypt';

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

      const user = await User.create(userDetails);
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
      });

      if (user && comparePassord(user.password, userDetails.password)) {
        return [user, null];
      }

      return [null, { status: 401, message: 'Username or password incorrect' }];
    } catch (error) {
      return [null, error];
    }
  }
}
