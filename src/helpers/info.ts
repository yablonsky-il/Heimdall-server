/* eslint-disable no-console */
export const throwError = (err: any) => {
  console.info('Error here!: ', err);

  return err;
};

export const throwSuccess = (success: any): void => {
  console.info(success, 'success!');
};
