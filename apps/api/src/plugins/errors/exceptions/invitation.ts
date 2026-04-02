import { ExceptionContent } from './types';

export type InvitationExceptionCode =
  | 'invitation-not-found'
  | 'invitation-expired'
  | 'invitation-revoked'
  | 'invitation-already-used'
  | 'invitation-already-completed'
  | 'signup-session-expired'
  | 'signup-session-invalid'
  | 'invitation-password-mismatch'
  | 'invitation-password-policy-violation'
  | 'invitation-email-already-exists'
  | 'invitation-unauthorized-inviter';

export const invitationExceptions: Record<
  InvitationExceptionCode,
  ExceptionContent
> = {
  'invitation-not-found': {
    status: 404,
    message: {
      es: 'La invitación no fue encontrada o es inválida',
      en: 'The invitation was not found or is invalid',
    },
  },
  'invitation-expired': {
    status: 410,
    message: {
      es: 'La invitación ha expirado',
      en: 'The invitation has expired',
    },
  },
  'invitation-revoked': {
    status: 410,
    message: {
      es: 'La invitación ha sido revocada',
      en: 'The invitation has been revoked',
    },
  },
  'invitation-already-used': {
    status: 409,
    message: {
      es: 'El token de invitación ya fue utilizado',
      en: 'The invitation token has already been used',
    },
  },
  'invitation-already-completed': {
    status: 409,
    message: {
      es: 'El registro de la invitación ya fue completado',
      en: 'The invitation signup has already been completed',
    },
  },
  'signup-session-expired': {
    status: 410,
    message: {
      es: 'La sesión de registro ha expirado',
      en: 'The signup session has expired',
    },
  },
  'signup-session-invalid': {
    status: 401,
    message: {
      es: 'El token de sesión de registro es inválido',
      en: 'The signup session token is invalid',
    },
  },
  'invitation-password-mismatch': {
    status: 400,
    message: {
      es: 'Las contraseñas no coinciden',
      en: 'Passwords do not match',
    },
  },
  'invitation-password-policy-violation': {
    status: 400,
    message: {
      es: 'La contraseña no cumple con los requisitos de seguridad',
      en: 'Password does not meet security requirements',
    },
  },
  'invitation-email-already-exists': {
    status: 409,
    message: {
      es: 'Ya existe un administrador con este correo electrónico',
      en: 'An admin with this email already exists',
    },
  },
  'invitation-unauthorized-inviter': {
    status: 403,
    message: {
      es: 'No tienes permiso para crear invitaciones',
      en: 'You are not authorized to create invitations',
    },
  },
};
