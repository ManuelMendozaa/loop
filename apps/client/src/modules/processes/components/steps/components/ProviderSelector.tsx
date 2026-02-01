'use client';

import { useState } from 'react';
import { Building2, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/src/common/Input';
import { Button } from '@/src/common/Button';
import { Separator } from '@/src/common/Separator';
import { Field, FieldDescription, FieldLabel } from '@/src/common/Field';
import { Provider } from '@/src/modules/providers/types';
import { useStep } from '../../../hooks/useStep';

interface ProviderSelectorProps {
  providers: Provider[];
}

export function ProviderSelector({ providers }: ProviderSelectorProps) {
  const { step, setStep } = useStep();

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedProviders = (step?.providerIds ?? [])
    ?.map((id) => providers.find((p) => p.id === id))
    .filter((p): p is Provider => p !== undefined);

  const availableProviders = providers.filter(
    (p) => !step?.providerIds?.includes(p.id)
  );

  const filteredProviders = availableProviders.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProvider = (provider: Provider) => {
    setStep({
      ...step,
      providerIds: [...(step?.providerIds || []), provider.id],
    });
    setSearchQuery('');
    setIsAdding(false);
  };

  const handleRemoveProvider = (providerId: string) => {
    setStep({
      ...step,
      providerIds: step?.providerIds?.filter((id) => id !== providerId),
    });
  };

  return (
    <Field>
      <FieldLabel>Providers</FieldLabel>
      <FieldDescription>
        Select providers responsible for this production step
      </FieldDescription>

      <div className="mt-2 space-y-2">
        {selectedProviders.length > 0 && (
          <div className="rounded-lg border">
            {selectedProviders.map((provider, index) => (
              <div key={provider.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                    <Building2 className="text-muted-foreground size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {provider.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {provider.type} · {provider.city}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemoveProvider(provider.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdding ? (
          <div className="rounded-lg border p-3">
            <Input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="mt-2 max-h-48 overflow-y-auto">
              {filteredProviders.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  {availableProviders.length === 0
                    ? 'All providers have been added'
                    : 'No providers found'}
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredProviders.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => handleAddProvider(provider)}
                      className="hover:bg-muted flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors"
                    >
                      <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                        <Building2 className="text-muted-foreground size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {provider.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {provider.type} · {provider.city}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setSearchQuery('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="w-full"
            disabled={availableProviders.length === 0}
          >
            <Plus className="size-4" />
            Add Provider
          </Button>
        )}
      </div>
    </Field>
  );
}
