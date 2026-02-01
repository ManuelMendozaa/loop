'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { IngredientsTable } from '@/src/modules/ingredients/components/IngredientsTable';
import { Ingredient, DUMMY_INGREDIENTS } from '@/src/modules/ingredients/types';
// import { getIngredients } from '@/src/modules/ingredients/services';

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchIngredients() {
    //   try {
    //     const response = await getIngredients({ page: 1, pageSize: 10 });
    //     setIngredients(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch ingredients:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchIngredients();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setIngredients(DUMMY_INGREDIENTS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Ingredients</h1>
        </div>
        <Button size="sm" asChild>
          <Link href="/app/ingredients/new">
            <Plus />
            Add Ingredient
          </Link>
        </Button>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <IngredientsTable ingredients={ingredients} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
