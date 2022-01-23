import ExtendedError from '../types/ExtendedError';

export default (status: number, message: string): ExtendedError => {
  const error: ExtendedError = new Error(message);
  error.status = status;

  return error;
}
