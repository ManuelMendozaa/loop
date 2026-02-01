'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { UserForm } from '@/src/modules/users/components/UserForm';

export default function NewUserPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/app/users');
  };

  const handleSubmit = async () => {
    // After successful submission, redirect to users list
    router.push('/app/users');
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/users">
            <ArrowLeft />
            Usuarios
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">Nuevo Usuario</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Crear Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
