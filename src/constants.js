export const { PARSE_URL } = process.env;

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const WEEK_DAYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const API_PARAM = 'api';

export const SIGN_UP_CODES = {
  0: 'User with current email is already exist',
  1: 'Registration completed successfully',
};

export const SIGN_IN_CODES = {
  0: 'Invalid email or password',
  1: 'Authentication is succeed',
};

export const COOKIES_CODES = {
  0: 'Cookies are not exist',
  1: 'Authentication is succeed',
};

// Year
export const COOKIE_AGE = 1000 * 60 * 60 * 24 * 30 * 12;
