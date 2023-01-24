import bcrypt from "bcrypt";

export const hashPassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

export const isValidPassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword,  hashedPassword)
};
