import { EmailSender, InvitationEmailData } from '../../application/ports/driven/EmailSender';

export class InvitationEmailSenderAdapter implements EmailSender {
  async sendInvitation(data: InvitationEmailData): Promise<void> {
    // TODO: Integrate with actual email service (SendGrid, SES, etc.)
    // For now, log the invitation details (without sensitive data)
    console.log(`[InvitationEmail] Sending invitation to: ${data.recipientEmail}`);
    console.log(`[InvitationEmail] Recipient: ${data.recipientFirstName} ${data.recipientLastName}`);
    console.log(`[InvitationEmail] Expires at: ${data.expiresAt.toISOString()}`);

    // In production, this would call an email service:
    // await emailService.send({
    //   to: data.recipientEmail,
    //   template: 'admin-invitation',
    //   data: {
    //     firstName: data.recipientFirstName,
    //     lastName: data.recipientLastName,
    //     inviteUrl: data.inviteUrl,
    //     expiresAt: data.expiresAt,
    //   },
    // });
  }
}
