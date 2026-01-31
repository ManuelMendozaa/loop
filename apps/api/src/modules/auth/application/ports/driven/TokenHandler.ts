export interface TokenHandler {
  issueTokens: (userId: string) => {
    accessToken: string;
    refreshToken: string;
  };
  verifyRefreshToken: (token: string) => { userId: string };
}
