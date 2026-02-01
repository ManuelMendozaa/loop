import { FastifyRequest } from 'fastify';
import { exceptionList } from './exceptions';
import { logError } from './logger';
import { InternalException } from './model';

export function handleError(
  req: FastifyRequest,
  error: Error | InternalException
) {
  if (error instanceof InternalException) {
    return {
      message: error.message,
      code: error.data.code,
      status: error.data.statusCode,
    };
  }

  logError(req, error);

  if ((error as any)?.statusCode === 429) {
    return {
      message: 'Too many requests',
      code: 'too-many-requests',
      status: 429,
    };
  }

  const internalErrorMessage = exceptionList['internal-server-error'];
  return {
    message: internalErrorMessage?.message?.['es'] || 'Internal server error',
    code: 'internal-server-error',
    status: 500,
  };
}
