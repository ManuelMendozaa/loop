import { ExceptionContent } from './types';

export type ConflictExceptionCode = 'registered-email';

export const conflictExceptions: Record<
  ConflictExceptionCode,
  ExceptionContent
> = {
  'registered-email': {
    status: 409,
    message: {
      es: 'El correo ya se encuentra registrado',
      en: 'The email is already registered',
    },
  },
};
