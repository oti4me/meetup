import { User } from '../models/User';
import { WELCOME_NOTIFICATION } from '../events/constants';
import { Email, IMailOptions } from '../services/Email';

class WelcomeNotification {
  /**
   * name of event to listen for
   *
   * @private
   *
   * @memberOf WelcomeNotification
   */
  private name = WELCOME_NOTIFICATION;

  /**
   * Returns the name of the event to listen for
   *
   * @returns {string}
   *
   * @memberOf WelcomeNotification
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Handles the event dispatched
   *
   * @param {User} user
   *
   * @memberOf WelcomeNotification
   */
  public async handle(user: User) {
    const email = new Email();
    // TODO Proper email body for new users
    const option: IMailOptions = {
      from: 'meetup.ngr@gmail.com',
      to: user.email,
      subject: 'Welcome to meetup',
      text: `Welcome to meetup, where you can chat with your friend and family`,
    };

    try {
      email.send(option);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default WelcomeNotification;
