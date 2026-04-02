import { FastifyReply } from 'fastify';
import {
  InvitationError,
  InvalidInvitationTokenError,
  InvitationExpiredError,
  InvitationRevokedError,
  InvitationAlreadyUsedError,
  InvitationAlreadyCompletedError,
  SignupSessionExpiredError,
  SignupSessionInvalidError,
  PasswordMismatchError,
  PasswordPolicyViolationError,
  EmailAlreadyExistsError,
  UnauthorizedInviterError,
} from '../../domain/errors';

interface ErrorResponse {
  code: string;
  message: string;
}

export function sendInvitationErrorResponse(
  error: unknown,
  reply: FastifyReply
): FastifyReply {
  if (!(error instanceof InvitationError)) {
    return reply.status(500).send({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    });
  }

  const { status, response } = mapInvitationError(error);
  return reply.status(status).send(response);
}

function mapInvitationError(error: InvitationError): {
  status: number;
  response: ErrorResponse;
} {
  // 400 Bad Request
  if (error instanceof PasswordMismatchError) {
    return {
      status: 400,
      response: { code: error.code, message: error.message },
    };
  }

  if (error instanceof PasswordPolicyViolationError) {
    return {
      status: 400,
      response: { code: error.code, message: error.message },
    };
  }

  // 401 Unauthorized
  if (error instanceof SignupSessionInvalidError) {
    return {
      status: 401,
      response: { code: error.code, message: error.message },
    };
  }

  // 403 Forbidden
  if (error instanceof UnauthorizedInviterError) {
    return {
      status: 403,
      response: { code: error.code, message: error.message },
    };
  }

  // 404 Not Found
  if (error instanceof InvalidInvitationTokenError) {
    return {
      status: 404,
      response: { code: error.code, message: error.message },
    };
  }

  // 409 Conflict
  if (error instanceof InvitationAlreadyUsedError) {
    return {
      status: 409,
      response: { code: error.code, message: error.message },
    };
  }

  if (error instanceof InvitationAlreadyCompletedError) {
    return {
      status: 409,
      response: { code: error.code, message: error.message },
    };
  }

  if (error instanceof EmailAlreadyExistsError) {
    return {
      status: 409,
      response: { code: error.code, message: error.message },
    };
  }

  // 410 Gone
  if (error instanceof InvitationExpiredError) {
    return {
      status: 410,
      response: { code: error.code, message: error.message },
    };
  }

  if (error instanceof InvitationRevokedError) {
    return {
      status: 410,
      response: { code: error.code, message: error.message },
    };
  }

  if (error instanceof SignupSessionExpiredError) {
    return {
      status: 410,
      response: { code: error.code, message: error.message },
    };
  }

  // Default fallback
  return {
    status: 500,
    response: {
      code: 'INVITATION_UNKNOWN_ERROR',
      message: 'An unexpected error occurred.',
    },
  };
}
