export interface AdminData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateAdminInput {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

export interface AdminRepository {
  findByEmail(email: string): Promise<AdminData | null>;
  create(input: CreateAdminInput): Promise<AdminData>;
}
