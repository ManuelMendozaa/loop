'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { IngredientForm } from '@/src/modules/ingredients/components/IngredientForm';

export default function NewIngredientPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/app/ingredients');
  };

  const handleSubmit = async () => {
    // After successful submission, redirect to ingredients list
    router.push('/app/ingredients');
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/ingredients">
            <ArrowLeft />
            Ingredientes
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">Nuevo Ingrediente</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Crear Ingrediente</CardTitle>
            </CardHeader>
            <CardContent>
              <IngredientForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
