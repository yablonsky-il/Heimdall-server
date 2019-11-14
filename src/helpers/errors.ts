export const throwError = (err: any) => {
  console.info(err);

  throw err;
};

export const throwSuccess = (success: any): void => {
  console.info(success, 'success!');
};
