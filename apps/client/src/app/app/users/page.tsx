'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { UsersTable } from '@/src/modules/users/components/UsersTable';
import { User } from '@/src/modules/users/types';
// import { getUsers } from '@/src/modules/users/services';

// Dummy data for development - replace with API call
const DUMMY_USERS: User[] = [
  {
    id: '1',
    firstName: 'Lourdes',
    lastName: 'Almeida',
    email: 'lourdes@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    firstName: 'Manuel',
    lastName: 'Mendoza',
    email: 'manuel@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '3',
    firstName: 'Janet',
    lastName: 'Vizcaya',
    email: 'janet@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '4',
    firstName: 'Oriana',
    lastName: 'Vizcaya',
    email: 'oriana@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '5',
    firstName: 'Neglis Oriana',
    lastName: 'Fermín',
    email: 'orianita@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '6',
    firstName: 'Siddartha',
    lastName: 'Fermín',
    email: 'siddartha@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '7',
    firstName: 'Zara',
    lastName: 'Fermín',
    email: 'zara@loop.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchUsers() {
    //   try {
    //     const response = await getUsers({ page: 1, pageSize: 10 });
    //     setUsers(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch users:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchUsers();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setUsers(DUMMY_USERS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Users</h1>
        </div>
        <Button size="sm">
          <Plus />
          Add User
        </Button>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <UsersTable users={users} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
