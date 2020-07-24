import bcrypt from 'bcryptjs';

/**
 * Encrypts users password
 *
 * @param {string} password
 * @returns
 */
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Verifies users password
 *
 * @param {string} hashedPassword
 * @param {string} plainPassword
 * @returns
 */
export const comparePassword = async (
  hashedPassword: string,
  plainPassword: string
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
