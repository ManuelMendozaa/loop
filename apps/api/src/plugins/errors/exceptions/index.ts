import { BadRequestExceptionCode, badRequestExceptions } from './bad-request';
import { conflictExceptions, ConflictExceptionCode } from './conflict';
import {
  InternalServerExceptionCode,
  internalServerExceptions,
} from './internal';
import { notFoundExceptions, NotFoundExceptionCode } from './not-found';
import {
  unauthorizedExceptions,
  UnAuthorizedExceptionCode,
} from './unauthorized';

export type ExceptionCode =
  | BadRequestExceptionCode // 400
  | UnAuthorizedExceptionCode // 401
  | NotFoundExceptionCode // 404
  | ConflictExceptionCode // 409
  | InternalServerExceptionCode; // 500

export const exceptionList = {
  ...badRequestExceptions,
  ...notFoundExceptions,
  ...unauthorizedExceptions,
  ...conflictExceptions,
  ...internalServerExceptions,
};
