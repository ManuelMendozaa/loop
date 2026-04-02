import { Document, model, Schema, Types } from 'mongoose';
import {
  InvitationStatusEnum,
  invitationStatusValues,
} from '../domain/value-objects/InvitationStatus';

interface InvitationCollection {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  status: InvitationStatusEnum;
  inviteTokenHash: string;
  inviteTokenUsedAt?: Date;
  signupSessionTokenHash?: string;
  signupSessionExpiresAt?: Date;
  initiatedAt?: Date;
  completedAt?: Date;
  revokedAt?: Date;
  expiresAt: Date;
  invitedByAdminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InvitationDocument = Document<Types.ObjectId, any, InvitationCollection> &
  InvitationCollection;

const invitationSchema = new Schema<InvitationDocument>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: invitationStatusValues,
      default: 'pending',
      required: true,
    },
    inviteTokenHash: {
      type: String,
      required: true,
      index: true,
    },
    inviteTokenUsedAt: {
      type: Date,
    },
    signupSessionTokenHash: {
      type: String,
      index: true,
      sparse: true,
    },
    signupSessionExpiresAt: {
      type: Date,
    },
    initiatedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    revokedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    invitedByAdminId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const InvitationModel = model<InvitationDocument>('Invitation', invitationSchema);
