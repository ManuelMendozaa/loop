export interface ExceptionThrower {
  throw(
    code: string,
    params?: Record<string, any>,
    language?: 'es' | 'en'
  ): never;
}
