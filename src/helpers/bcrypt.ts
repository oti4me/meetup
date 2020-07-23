import bcrypt from 'bcryptjs';

/**
 * Encrypts users password
 *
 * @param {string} password
 * @returns
 */
export const hashPassord = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * Verifies users password
 *
 * @param {string} hashedPassword
 * @param {string} plainPassword
 * @returns
 */
export const comparePassord = async (
  hashedPassword: string,
  plainPassword: string
) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  console.log(result);
  return result;
};
