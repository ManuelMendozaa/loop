import { FastifyReply } from 'fastify';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';
import { EmailAlreadyInUseError } from '../../domain/errors/EmailAlreadyInUseError';


export function sendErrorResponse(error: unknown, reply: FastifyReply) {
  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({
      code: error.code,
      message: error.message,
    });
  }

  if (error instanceof EmailAlreadyInUseError) {
    return reply.status(409).send({
      code: error.code,
      message: error.message,
    });
  }

  return reply.status(500).send({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred.',
  });
}
