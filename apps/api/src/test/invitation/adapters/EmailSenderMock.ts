import {
  EmailSender,
  InvitationEmailData,
} from '@/modules/invitation/application/ports/driven/EmailSender';

export class EmailSenderMock implements EmailSender {
  private sentEmails: InvitationEmailData[] = [];

  async sendInvitation(data: InvitationEmailData): Promise<void> {
    this.sentEmails.push(data);
  }

  // Helpers for tests
  getSentEmails(): InvitationEmailData[] {
    return this.sentEmails;
  }

  getLastSentEmail(): InvitationEmailData | undefined {
    return this.sentEmails[this.sentEmails.length - 1];
  }

  reset(): void {
    this.sentEmails = [];
  }
}
