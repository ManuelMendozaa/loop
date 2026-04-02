export interface SessionData {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AdminSessionData {
  admin: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  session: SessionData;
}

export interface SessionCreator {
  createForAdmin(adminId: string): Promise<AdminSessionData>;
}
