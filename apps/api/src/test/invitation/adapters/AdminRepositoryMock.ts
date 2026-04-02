import {
  AdminRepository,
  AdminData,
  CreateAdminInput,
} from '@/modules/invitation/application/ports/driven/AdminRepository';
import { admins, AdminTestData } from './data';

export class AdminRepositoryMock implements AdminRepository {
  private admins: AdminTestData[] = [...admins];

  async findByEmail(email: string): Promise<AdminData | null> {
    const admin = this.admins.find((a) => a.email === email);
    if (!admin) return null;

    return {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
  }

  async create(input: CreateAdminInput): Promise<AdminData> {
    const id = `admin-${this.admins.length + 1}`;

    const admin: AdminTestData = {
      id,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      passwordHash: input.passwordHash,
    };

    this.admins.push(admin);

    return {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
  }

  // Helper for tests
  reset(): void {
    this.admins = [...admins];
  }

  getAll(): AdminTestData[] {
    return this.admins;
  }
}
