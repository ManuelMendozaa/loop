import { ExceptionCode } from './exceptions';

interface ExceptionData {
  code: ExceptionCode;
  message: string;
  statusCode: number;
  stack?: string;
}

export class InternalException extends Error {
  public data: ExceptionData;

  constructor(data: ExceptionData) {
    super(data.message);
    this.data = data;
  }
}
