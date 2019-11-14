import { getHash } from './util';

export const isValidPass = (enteredPassword: string, savedPassword: string): boolean => {
  const hashPassword = getHash(enteredPassword);

  if (savedPassword === hashPassword) return true;

  return false;
};
