import { ProfileStatus, ProfileStatusEnum } from './ProfileStatus';

export interface ProfileEntityContract {
  id?: string;
  bio?: string;
  avatarUrl?: string;
  userId: string;
  status: ProfileStatusEnum;
}

export class ProfileEntity {
  public readonly id?: string;
  public bio?: string;
  public avatarUrl?: string;
  public userId: string;
  public status: ProfileStatus;

  constructor(input: ProfileEntityContract) {
    this.id = input.id;
    this.bio = input.bio;
    this.avatarUrl = input.avatarUrl;
    this.userId = input.userId;
    this.status = ProfileStatus.fromValue(input.status);
  }

  public static fromPersistence(input: ProfileEntityContract) {
    return new ProfileEntity({ ...input });
  }
}
