export function getFetchHeaders(options = {}): Record<string, string> {
  const authorization = getAuthorizationHeader();
  return {
    ...(authorization ? { Authorization: authorization } : {}),
    'Accept-Language': 'es-VE, es; q=0.9, en; q=0.8',
    ...options,
  };
}

function getAuthorizationHeader(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return localStorage.getItem('token') ?? undefined;
}
