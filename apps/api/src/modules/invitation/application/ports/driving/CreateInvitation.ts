export interface CreateInvitationContract {
  email: string;
  firstName: string;
  lastName: string;
  inviterEmail: string;
  inviterAdminId: string;
}

export interface CreateInvitationResponse {
  invitationId: string;
  email: string;
  expiresAt: Date;
}
