import jwt from 'jsonwebtoken';
import util from 'util';

/**
 * Encode user information and return token
 *
 * @param {{ [key: string]: any }} userDetails
 * @returns
 */
export const encode = async (userDetails: { [key: string]: any }) => {
  try {
    const key = process.env.JWT_PRIVATE_KEY;
    const sign = util.promisify(jwt.sign);
    const token = await sign(userDetails, key);

    return [token, null];
  } catch (error) {
    return [null, error];
  }
};

/**
 * Decode jwt token and return contained user details
 *
 * @param {string} token
 * @returns
 */
export const decode = async (token: string) => {
  try {
    const key = process.env.JWT_PRIVATE_KEY;
    const verify = util.promisify(jwt.verify);
    const user = await verify(token, key);

    return [user, null];
  } catch (error) {
    return [null, error];
  }
};
