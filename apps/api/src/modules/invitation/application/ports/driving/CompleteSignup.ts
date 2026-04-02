import { AdminSessionData } from '../driven/SessionCreator';

export interface CompleteSignupContract {
  signupSessionToken: string;
  password: string;
  passwordConfirmation: string;
}

export type CompleteSignupResponse = AdminSessionData;
