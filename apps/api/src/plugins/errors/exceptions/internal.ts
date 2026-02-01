import { ExceptionContent } from './types';

export type InternalServerExceptionCode =
  | 'internal-server-error'
  | 'support-needed'; // 500

export const internalServerExceptions: Record<
  InternalServerExceptionCode,
  ExceptionContent
> = {
  'internal-server-error': {
    status: 500,
    message: {
      es: 'Error interno. Por favor, intente más tarde',
      en: 'Internal server error. Please, try again later',
    },
  },
  'support-needed': {
    status: 500,
    message: {
      es: 'Error interno. Por favor, contacte al soporte',
      en: 'Internal server error. Please, contact support',
    },
  },
};
