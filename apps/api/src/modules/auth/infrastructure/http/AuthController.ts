import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthApplication } from '../../application';
import { SignUpContract } from '../../application/ports/driving/SignUp';
import { sendErrorResponse } from '../errors/handler';

export class AuthController {
  private authApplication: AuthApplication;

  public constructor(authApplication: AuthApplication) {
    this.authApplication = authApplication;

    this.signIn = this.signIn.bind(this);
  }

  async signIn(
    request: FastifyRequest<{
      Body: SignUpContract;
    }>,
    reply: FastifyReply
  ) {
    try {
      const response = await this.authApplication.useCases.signIn.execute(
        request.body
      );
      return reply.status(201).send(response);
    } catch(error) {
      return sendErrorResponse(error, reply);
    }
  }
}
