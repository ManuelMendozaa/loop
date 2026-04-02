export interface RetrieveInvitationContract {
  token: string;
}

export interface RetrieveInvitationResponse {
  email: string;
  firstName: string;
  lastName: string;
  signupSessionToken: string;
  signupSessionExpiresAt: Date;
}
