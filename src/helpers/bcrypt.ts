import bcrypt from 'bcryptjs';

export const hashPassord = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassord = async (
  hashedPassword: string,
  plainPassword: string
) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  console.log(result);
  return result;
};
