import ExtendedError from '../types/ExtendedError';

export default (status: number, message: string): void => {
  const error: ExtendedError = new Error(message);
  error.status = status;
  throw error;
}
