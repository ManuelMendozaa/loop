import { FastifyInstance } from 'fastify';
import { InvitationController } from './InvitationController';

export function registerInvitationRoutes(
  fastify: FastifyInstance,
  invitationController: InvitationController,
  options?: { authMiddleware?: any }
) {
  // Create invitation - requires authentication
  fastify.post(
    '/admin-invitations',
    {
      preHandler: options?.authMiddleware,
    },
    invitationController.createInvitation
  );

  // Retrieve invitation / Start signup - public
  fastify.get(
    '/admin-invitations/:token',
    invitationController.retrieveInvitation
  );

  // Complete signup - public (uses signup session token in body)
  fastify.post(
    '/admin-invitations/complete',
    invitationController.completeSignup
  );
}
