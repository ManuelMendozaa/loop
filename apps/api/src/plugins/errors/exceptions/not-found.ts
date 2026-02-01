import { ExceptionContent } from './types';

export type NotFoundExceptionCode =
  | 'country-not-found'
  | 'currency-not-found'
  | 'discount-not-found'
  | 'user-not-found'
  | 'payment-not-found'
  | 'payment-method-not-found'
  | 'tax-not-found'
  | 'role-not-found';

export const notFoundExceptions: Record<
  NotFoundExceptionCode,
  ExceptionContent
> = {
  'country-not-found': {
    status: 404,
    message: {
      es: 'País no encontrado',
      en: 'Country not found',
    },
  },
  'currency-not-found': {
    status: 404,
    message: {
      es: 'Moneda no encontrada',
      en: 'Currency not found',
    },
  },
  'discount-not-found': {
    status: 404,
    message: {
      es: 'Descuento no encontrado',
      en: 'Discount not found',
    },
  },
  'user-not-found': {
    status: 404,
    message: {
      es: 'Usuario no encontrado',
      en: 'User not found',
    },
  },
  'payment-not-found': {
    status: 404,
    message: {
      es: 'Pago no encontrado',
      en: 'Payment not found',
    },
  },
  'payment-method-not-found': {
    status: 404,
    message: {
      es: 'Método de pago no encontrado',
      en: 'Payment method not found',
    },
  },
  'tax-not-found': {
    status: 404,
    message: {
      es: 'Impuesto no encontrado',
      en: 'Tax not found',
    },
  },
  'role-not-found': {
    status: 404,
    message: {
      es: 'Rol no encontrado',
      en: 'Role not found',
    },
  },
};
