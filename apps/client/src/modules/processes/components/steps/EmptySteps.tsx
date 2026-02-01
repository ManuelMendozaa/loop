'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';

export function EmptySteps({ onAddClick }: { onAddClick: () => void }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className="bg-muted mb-4 rounded-full p-3">
          <Plus className="text-muted-foreground size-6" />
        </div>
        <h3 className="mb-1 font-medium">No steps configured</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Add steps to define the production process for this product
        </p>
        <Button onClick={onAddClick}>
          <Plus />
          Add First Step
        </Button>
      </CardContent>
    </Card>
  );
}
