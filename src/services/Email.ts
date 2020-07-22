import { emailTransporter } from '../config/nodemailer';

export interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export class Email {
  /**
   * Sends email to the provided email option
   *
   * @param {IMailOptions} mailOptions
   * @returns
   *
   * @memberOf Email
   */
  public async send(mailOptions: IMailOptions) {
    return new Promise((resolve, reject) => {
      emailTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }
}
