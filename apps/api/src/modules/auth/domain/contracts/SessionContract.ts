export interface SessionContract {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenFamily: TokenFamily[];
}

export interface TokenFamily {
  accessToken: string;
  refreshToken: string;
}
