import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import { Input } from '@/src/common/Input';
import { Textarea } from '@/src/common/textarea';
import { Badge } from '@/src/common/Badge';
import {
  PRIORITY_VARIANTS,
  PROCESS_PRIORITIES,
  PROCESS_PRIORITY_LABELS,
  ProcessPriority,
  ProcessStep,
} from '../../types/process';
import { AlertCircle, Clock } from 'lucide-react';
import { formatDuration } from '../../utils/format';
import { useMemo } from 'react';
import { computeTotalTime } from '../../utils/time';

interface ProcessBasicInformationProps {
  name: string;
  description: string;
  priority: ProcessPriority;
  steps: ProcessStep[];
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setPriority: (value: ProcessPriority) => void;
  canSave: boolean;
}

export function ProcessBasicInformation({
  name,
  description,
  priority,
  steps,
  setName,
  setDescription,
  setPriority,
  canSave,
}: ProcessBasicInformationProps) {
  const totalTime = useMemo(() => computeTotalTime(steps), [steps]);
  const totalIngredients = useMemo(() => {
    const ingredientIds = new Set<string>();
    steps.forEach((step) => {
      step.ingredients?.forEach((ing) => ingredientIds.add(ing.ingredientId));
    });
    return ingredientIds.size;
  }, [steps]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="process-name">Process Name</FieldLabel>
                <Input
                  id="process-name"
                  placeholder="Enter process name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FieldDescription>
                  A descriptive name for this process
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="process-description">
                  Description
                </FieldLabel>
                <Textarea
                  id="process-description"
                  placeholder="Describe the purpose of this process"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="process-priority">Priority</FieldLabel>
                <select
                  id="process-priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as ProcessPriority)
                  }
                  className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                >
                  {PROCESS_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {PROCESS_PRIORITY_LABELS[p]}
                    </option>
                  ))}
                </select>
              </Field>
            </FieldGroup>
          </div>

          {/* Summary Panel */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="mb-4 text-sm font-medium">Process Summary</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Status</span>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Priority</span>
                <Badge variant={PRIORITY_VARIANTS[priority]}>
                  {PROCESS_PRIORITY_LABELS[priority]}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Steps
                </span>
                <span className="text-sm font-medium">{steps.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Estimated Time
                </span>
                <span className="flex items-center gap-1 text-sm font-medium">
                  <Clock className="size-3.5" />
                  {formatDuration(totalTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Ingredients
                </span>
                <span className="text-sm font-medium">
                  {totalIngredients > 0 ? `${totalIngredients} unique` : '—'}
                </span>
              </div>
            </div>

            {!canSave && (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="text-xs text-amber-800 dark:text-amber-200">
                  {!name.trim() && <p>Process name is required</p>}
                  {steps.length === 0 && <p>At least one step is required</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
