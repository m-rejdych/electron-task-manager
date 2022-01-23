import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

import createError from '../util/createError';
import type JwtAuthHandler from '../types/JwtAuthHandler';

type Validator = <T extends object>(
  dto: ClassConstructor<T>,
) => JwtAuthHandler<{}, null, T>;

const validationMiddleware: Validator = (dto) => async (req, _, next) => {
  try {
    const validateClass = plainToInstance(dto, req.body);

    if (!validateClass) {
      createError(400, 'Request body could not be parsed.');
    }

    const errors = await validate(validateClass);

    if (errors.length) {
      console.log(errors);
      const message = errors.reduce(
        (str, { constraints }, index) =>
          `${str}${
            constraints
              ? `${index ? ' ' : ''}${Object.values(constraints).join(' ')}`
              : ''
          }`,
        '',
      );
      createError(400, message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validationMiddleware;
