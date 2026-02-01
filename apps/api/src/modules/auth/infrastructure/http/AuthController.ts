import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthApplication } from '../../application';
import { SignUpContract } from '../../application/ports/driving/SignUp';

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
    const response = await this.authApplication.useCases.signIn.execute(
      request.body
    );
    return reply.status(201).send(response);
  }
}
