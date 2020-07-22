import { User } from '../models/User';

export class UserRepository {
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
}
