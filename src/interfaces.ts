export interface Db {
  collection: Function;
}

export interface Env {
  DEVELOPMENT: string;
  PRODUCTION: string;
};

export interface WeekDays {
  Sunday: number;
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
};

export interface Authentication {
  0: string;
  1: string;
}

export interface GetDate {
  day: string;
  month: string;
  year: string;
}

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
}

export interface Client {
  on: Function;
}
