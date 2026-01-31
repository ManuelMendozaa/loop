export class TokenHandlerAdapter {
  static issueTokens(userId: string) {
    return {
      accessToken: `access-${userId}`,
      refreshToken: `refresh-${userId}`,
    };
  }

  static verifyRefreshToken(token: string) {
    const tokenSegments = token.split('-');
    if (tokenSegments[0] !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    return { userId: tokenSegments[1] };
  }
}
