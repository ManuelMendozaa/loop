export type HTTPStatusError = 400 | 401 | 404 | 409 | 500 | 502;

export interface ExceptionContent {
  status: HTTPStatusError;
  message: {
    es: string;
    en: string;
  };
}
