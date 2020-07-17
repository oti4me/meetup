import { User } from "../models/User";

export class UserRepository {
  public async signup(userDetails: any) {
    try {
      const user = await User.create({
        username: userDetails.username,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
      });

      return [user, null];
    } catch (error) {
      return [null, error];
    }
  }
}
