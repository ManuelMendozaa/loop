import { ExceptionContent } from './types';

export type BadRequestExceptionCode = 'expired-otp' | 'invalid-otp' | 'default';

export const badRequestExceptions: Record<
  BadRequestExceptionCode,
  ExceptionContent
> = {
  'expired-otp': {
    status: 400,
    message: {
      es: 'El código de verificación ha expirado',
      en: 'The verification code has expired',
    },
  },
  'invalid-otp': {
    status: 400,
    message: {
      es: 'Código de verificación inválido',
      en: 'Invalid verification code',
    },
  },
  default: {
    status: 400,
    message: {
      es: 'Solicitud inválida',
      en: 'Bad request',
    },
  },
};
