import { FastifyReply, FastifyRequest } from 'fastify';
import { InvitationApplication } from '../../application';
import { CreateInvitationContract } from '../../application/ports/driving/CreateInvitation';
import { CompleteSignupContract } from '../../application/ports/driving/CompleteSignup';
import { sendInvitationErrorResponse } from '../errors/handler';

interface AuthenticatedRequest {
  adminId: string;
  adminEmail: string;
}

export class InvitationController {
  private invitationApplication: InvitationApplication;

  constructor(invitationApplication: InvitationApplication) {
    this.invitationApplication = invitationApplication;

    this.createInvitation = this.createInvitation.bind(this);
    this.retrieveInvitation = this.retrieveInvitation.bind(this);
    this.completeSignup = this.completeSignup.bind(this);
  }

  async createInvitation(
    request: FastifyRequest<{
      Body: Omit<CreateInvitationContract, 'inviterEmail' | 'inviterAdminId'>;
    }> & { user?: AuthenticatedRequest },
    reply: FastifyReply
  ) {
    try {
      const response = await this.invitationApplication.useCases.createInvitation.execute({
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        inviterEmail: request.user?.adminEmail || '',
        inviterAdminId: request.user?.adminId || '',
      });
      return reply.status(201).send(response);
    } catch (error) {
      return sendInvitationErrorResponse(error, reply);
    }
  }

  async retrieveInvitation(
    request: FastifyRequest<{
      Params: { token: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const response = await this.invitationApplication.useCases.retrieveInvitation.execute({
        token: request.params.token,
      });
      return reply.status(200).send(response);
    } catch (error) {
      return sendInvitationErrorResponse(error, reply);
    }
  }

  async completeSignup(
    request: FastifyRequest<{
      Body: CompleteSignupContract;
    }>,
    reply: FastifyReply
  ) {
    try {
      const response = await this.invitationApplication.useCases.completeSignup.execute(
        request.body
      );
      return reply.status(201).send(response);
    } catch (error) {
      return sendInvitationErrorResponse(error, reply);
    }
  }
}
