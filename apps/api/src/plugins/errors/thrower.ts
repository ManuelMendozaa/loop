import { ExceptionThrower } from '@/shared/ExceptionThrower';
import { ExceptionCode, exceptionList } from './exceptions';
import { InternalException } from './model';

export class ExceptionThrowerAdapter {
  static throw(
    code: ExceptionCode,
    params?: Record<string, any>,
    language: 'es' | 'en' = 'es'
  ) {
    console.error(`${code} with params ${params}`, { code, params, language });

    const invalidErrorCode = !Object.keys(exceptionList).includes(code);
    if (invalidErrorCode) {
      return this.throwInvalidCodeException(code, language);
    }

    const error = exceptionList[code];
    const rawMessage = error.message[language];
    const errorMessage = this.injectParams(rawMessage, params);
    throw new InternalException({
      message: errorMessage,
      code,
      statusCode: error.status,
    });
  }

  private static throwInvalidCodeException(
    code: ExceptionCode,
    language: 'es' | 'en'
  ) {
    const error = exceptionList['internal-server-error'];

    throw new InternalException({
      message: error.message[language],
      statusCode: error.status,
      code,
    });
  }

  private static injectParams(message: string, params?: Record<string, any>) {
    if (!params) return message;
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(`<${key}>`, params[key]);
    }, message);
  }
}
