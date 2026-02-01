import { Document, model, Schema, Types } from 'mongoose';
import {
  UserStatusEnum,
  userStatusValues,
} from '../domain/value-objects/Status';

interface UserCollection {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatusEnum;
  slug: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = Document<Types.ObjectId, any, UserCollection> &
  UserCollection;

// 1. Create the Mongoose Schema
const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      // required: [true, 'Por favor ingrese un nombre'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      // required: [true, 'Por favor ingrese un correo electrónico'],
      trim: true,
    },
    status: {
      type: String,
      enum: userStatusValues,
      default: 'active',
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      // required: [true, 'Por favor ingrese una contraseña'],
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);
