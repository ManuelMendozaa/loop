'use client';

import { Provider } from '@/src/modules/providers/types';
import { IngredientSelector } from './components/IngredientSelector';
import { GeneralInfoFields } from './components/GeneralInfoFields';
import { ProviderSelector } from './components/ProviderSelector';
import { useStep } from '../../hooks/useStep';

interface DetailsStepProps {
  providers: Provider[];
}

export function DetailsStep({ providers }: DetailsStepProps) {
  const { step } = useStep();

  const isPreparation = step?.type === 'preparation';
  const isProduction = step?.type === 'production';
  const hasRightPanel = isPreparation || isProduction;

  if (hasRightPanel) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="mb-4 text-sm font-medium">General Information</h4>
          <GeneralInfoFields />
        </div>
        <div>
          {isPreparation && <IngredientSelector />}
          {isProduction && <ProviderSelector providers={providers} />}
        </div>
      </div>
    );
  }

  return <GeneralInfoFields />;
}
