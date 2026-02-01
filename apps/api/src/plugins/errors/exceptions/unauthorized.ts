import { ExceptionContent } from './types';

export type UnAuthorizedExceptionCode =
  | 'unauthorized-action'
  | 'invalid-credentials'
  | 'invalid-new-password';

export const unauthorizedExceptions: Record<
  UnAuthorizedExceptionCode,
  ExceptionContent
> = {
  'unauthorized-action': {
    status: 401,
    message: {
      es: 'No tienes permisos para realizar esta acción',
      en: 'You do not have permission to perform this action',
    },
  },
  'invalid-credentials': {
    status: 401,
    message: {
      es: 'Credenciales inválidas',
      en: 'Invalid credentials',
    },
  },
  'invalid-new-password': {
    status: 400,
    message: {
      es: 'La nueva contraseña debe ser distinta a la anterior',
      en: 'The new password must be different from the previous one',
    },
  },
};
