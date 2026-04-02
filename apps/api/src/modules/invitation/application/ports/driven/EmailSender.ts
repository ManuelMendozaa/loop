export interface InvitationEmailData {
  recipientEmail: string;
  recipientFirstName: string;
  recipientLastName: string;
  inviteUrl: string;
  expiresAt: Date;
}

export interface EmailSender {
  sendInvitation(data: InvitationEmailData): Promise<void>;
}
