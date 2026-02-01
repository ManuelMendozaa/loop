'use client';

import { useState, useCallback } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Image as ImageIcon,
  Package,
  Box,
  Droplet,
  Palette,
  Shield,
  MoreHorizontal,
  Flag,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { Label } from '@/src/common/Label';
import { Textarea } from '@/src/common/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/common/Select';
import { toast } from '@/src/common/Sonner';
import {
  MetricUnit,
  IngredientCategory,
  IngredientPriority,
  METRIC_UNIT_LABELS,
  INGREDIENT_CATEGORY_LABELS,
  INGREDIENT_PRIORITY_LABELS,
  INGREDIENT_CATEGORIES,
  INGREDIENT_PRIORITIES,
} from '../types';
import { DUMMY_PROVIDERS } from '@/src/modules/providers/types';

type FormStep = 1 | 2 | 3 | 4;

interface IngredientFormData {
  name: string;
  description: string;
  category: IngredientCategory | '';
  priority: IngredientPriority | '';
  providerId: string;
  stock: string;
  minStock: string;
  metricUnit: MetricUnit | '';
  images: File[];
}

interface IngredientFormProps {
  onSubmit?: (data: IngredientFormData) => Promise<void>;
  onCancel?: () => void;
}

const METRIC_UNITS: MetricUnit[] = ['kg', 'g', 'lt', 'ml', 'units', 'oz', 'lb'];

const CATEGORY_ICONS: Record<IngredientCategory, LucideIcon> = {
  raw_material: Package,
  packaging: Box,
  additive: Droplet,
  colorant: Palette,
  preservative: Shield,
  other: MoreHorizontal,
};

const PRIORITY_COLORS: Record<IngredientPriority, string> = {
  low: 'text-gray-500',
  medium: 'text-blue-500',
  high: 'text-orange-500',
  critical: 'text-red-500',
};

export function IngredientForm({ onSubmit, onCancel }: IngredientFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<IngredientFormData>({
    name: '',
    description: '',
    category: '',
    priority: '',
    providerId: '',
    stock: '',
    minStock: '',
    metricUnit: '',
    images: [],
  });

  const updateFormData = (field: keyof IngredientFormData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: Basic information validation
  const isStep1Complete = formData.name && formData.category && formData.priority;

  // Step 2: Provider validation
  const isStep2Complete = !!formData.providerId;

  // Step 3: Stock validation
  const isStep3Complete = formData.stock && formData.metricUnit;

  // Step 4: Images (optional, always "complete")
  const isStep4Complete = true;

  const selectedProvider = DUMMY_PROVIDERS.find((p) => p.id === formData.providerId);

  const handleStepClick = (step: FormStep) => {
    // Can only go back to completed steps or current step
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && isStep1Complete) {
      setCurrentStep(2);
    } else if (step === 3 && isStep1Complete && isStep2Complete) {
      setCurrentStep(3);
    } else if (step === 4 && isStep1Complete && isStep2Complete && isStep3Complete) {
      setCurrentStep(4);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Complete) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Complete) {
      setCurrentStep(3);
    } else if (currentStep === 3 && isStep3Complete) {
      setCurrentStep(4);
    }
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageFiles],
      }));
    }
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!isStep1Complete || !isStep2Complete || !isStep3Complete) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success('Ingrediente creado correctamente');
      }
    } catch {
      toast.error('Error al crear el ingrediente');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = (step: FormStep) => {
    switch (step) {
      case 1:
        return isStep1Complete;
      case 2:
        return isStep2Complete;
      case 3:
        return isStep3Complete;
      case 4:
        return formData.images.length > 0;
    }
  };

  const isStepAccessible = (step: FormStep) => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return isStep1Complete;
      case 3:
        return isStep1Complete && isStep2Complete;
      case 4:
        return isStep1Complete && isStep2Complete && isStep3Complete;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Step 1: Basic Information */}
      <div className="rounded-lg border">
        <button
          type="button"
          onClick={() => handleStepClick(1)}
          className={`flex w-full items-center justify-between p-4 text-left ${
            currentStep === 1 ? 'border-b' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex size-7 items-center justify-center rounded-full text-sm font-medium ${
                isStep1Complete
                  ? 'bg-green-100 text-green-600'
                  : currentStep === 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {isStep1Complete ? <CheckCircle2 className="size-4" /> : '1'}
            </div>
            <div>
              <p className="font-medium">Información básica</p>
              {isStep1Complete && currentStep !== 1 && (
                <p className="text-sm text-muted-foreground">
                  {formData.name} - {INGREDIENT_CATEGORY_LABELS[formData.category as IngredientCategory]}
                </p>
              )}
            </div>
          </div>
          {isStep1Complete && (
            <div className="text-muted-foreground">
              {currentStep === 1 ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          )}
        </button>
        {currentStep === 1 && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  placeholder="Nombre del ingrediente"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción del ingrediente"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                {!formData.category ? (
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {INGREDIENT_CATEGORIES.map((cat) => {
                        const Icon = CATEGORY_ICONS[cat];
                        return (
                          <SelectItem key={cat} value={cat}>
                            <div className="flex items-center gap-2">
                              <Icon className="size-4" />
                              {INGREDIENT_CATEGORY_LABELS[cat]}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="rounded-lg border bg-muted/50 p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = CATEGORY_ICONS[formData.category as IngredientCategory];
                        return <Icon className="size-4 text-muted-foreground" />;
                      })()}
                      <span className="text-sm font-medium">
                        {INGREDIENT_CATEGORY_LABELS[formData.category as IngredientCategory]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateFormData('category', '')}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad *</Label>
                {!formData.priority ? (
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => updateFormData('priority', value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecciona prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      {INGREDIENT_PRIORITIES.map((pri) => (
                        <SelectItem key={pri} value={pri}>
                          <div className="flex items-center gap-2">
                            <Flag className={`size-4 ${PRIORITY_COLORS[pri]}`} />
                            {INGREDIENT_PRIORITY_LABELS[pri]}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="rounded-lg border bg-muted/50 p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Flag className={`size-4 ${PRIORITY_COLORS[formData.priority as IngredientPriority]}`} />
                      <span className="text-sm font-medium">
                        {INGREDIENT_PRIORITY_LABELS[formData.priority as IngredientPriority]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateFormData('priority', '')}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNextStep} disabled={!isStep1Complete}>
                Continuar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Connector 1-2 */}
      <div className="flex justify-center">
        <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
      </div>

      {/* Step 2: Provider Selection */}
      <div
        className={`rounded-lg border ${!isStepAccessible(2) ? 'opacity-50' : ''}`}
      >
        <button
          type="button"
          onClick={() => handleStepClick(2)}
          disabled={!isStepAccessible(2)}
          className={`flex w-full items-center justify-between p-4 text-left ${
            currentStep === 2 ? 'border-b' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex size-7 items-center justify-center rounded-full text-sm font-medium ${
                isStep2Complete
                  ? 'bg-green-100 text-green-600'
                  : currentStep === 2
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {isStep2Complete ? <CheckCircle2 className="size-4" /> : '2'}
            </div>
            <div>
              <p className="font-medium">Proveedor</p>
              {isStep2Complete && currentStep !== 2 && (
                <p className="text-sm text-muted-foreground">
                  {selectedProvider?.name}
                </p>
              )}
            </div>
          </div>
          {isStep2Complete && (
            <div className="text-muted-foreground">
              {currentStep === 2 ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          )}
        </button>
        {currentStep === 2 && (
          <div className="p-4 space-y-4">
            {!selectedProvider ? (
              <div className="space-y-2">
                <Label htmlFor="provider">Proveedor *</Label>
                <Select
                  value={formData.providerId}
                  onValueChange={(value) => updateFormData('providerId', value)}
                >
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {DUMMY_PROVIDERS.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/50 p-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{selectedProvider.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedProvider.email} · {selectedProvider.city}, {selectedProvider.country}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateFormData('providerId', '')}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleNextStep} disabled={!isStep2Complete}>
                Continuar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Connector 2-3 */}
      <div className="flex justify-center">
        <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
      </div>

      {/* Step 3: Stock Information */}
      <div
        className={`rounded-lg border ${!isStepAccessible(3) ? 'opacity-50' : ''}`}
      >
        <button
          type="button"
          onClick={() => handleStepClick(3)}
          disabled={!isStepAccessible(3)}
          className={`flex w-full items-center justify-between p-4 text-left ${
            currentStep === 3 ? 'border-b' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex size-7 items-center justify-center rounded-full text-sm font-medium ${
                isStep3Complete
                  ? 'bg-green-100 text-green-600'
                  : currentStep === 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {isStep3Complete ? <CheckCircle2 className="size-4" /> : '3'}
            </div>
            <div>
              <p className="font-medium">Inventario</p>
              {isStep3Complete && currentStep !== 3 && (
                <p className="text-sm text-muted-foreground">
                  {formData.stock} {METRIC_UNIT_LABELS[formData.metricUnit as MetricUnit]}
                  {formData.minStock && ` (mín: ${formData.minStock})`}
                </p>
              )}
            </div>
          </div>
          {isStep3Complete && (
            <div className="text-muted-foreground">
              {currentStep === 3 ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          )}
        </button>
        {currentStep === 3 && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock actual *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => updateFormData('stock', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Stock mínimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={formData.minStock}
                  onChange={(e) => updateFormData('minStock', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metricUnit">Unidad *</Label>
                <Select
                  value={formData.metricUnit}
                  onValueChange={(value) => updateFormData('metricUnit', value)}
                >
                  <SelectTrigger id="metricUnit">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {METRIC_UNITS.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {METRIC_UNIT_LABELS[unit]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNextStep} disabled={!isStep3Complete}>
                Continuar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Connector 3-4 */}
      <div className="flex justify-center">
        <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
      </div>

      {/* Step 4: Images */}
      <div
        className={`rounded-lg border ${!isStepAccessible(4) ? 'opacity-50' : ''}`}
      >
        <button
          type="button"
          onClick={() => handleStepClick(4)}
          disabled={!isStepAccessible(4)}
          className={`flex w-full items-center justify-between p-4 text-left ${
            currentStep === 4 ? 'border-b' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex size-7 items-center justify-center rounded-full text-sm font-medium ${
                formData.images.length > 0
                  ? 'bg-green-100 text-green-600'
                  : currentStep === 4
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {formData.images.length > 0 ? (
                <CheckCircle2 className="size-4" />
              ) : (
                '4'
              )}
            </div>
            <div>
              <p className="font-medium">Imágenes</p>
              {formData.images.length > 0 && currentStep !== 4 && (
                <p className="text-sm text-muted-foreground">
                  {formData.images.length} imagen{formData.images.length !== 1 ? 'es' : ''} agregada{formData.images.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="text-muted-foreground">
              {currentStep === 4 ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          )}
        </button>
        {currentStep === 4 && (
          <div className="p-4 space-y-4">
            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
            >
              <Upload
                className={`size-10 mb-4 ${
                  isDragging ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <p className="text-sm font-medium mb-1">
                Arrastra y suelta imágenes aquí
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                o haz clic para seleccionar archivos
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <Button type="button" variant="outline" size="sm">
                Seleccionar archivos
              </Button>
            </div>

            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {formData.images.map((file, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg border overflow-hidden bg-muted"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="size-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                      <p className="text-xs text-white truncate">{file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {formData.images.length === 0 && (
              <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
                <ImageIcon className="size-5" />
                <p className="text-sm">No hay imágenes agregadas (opcional)</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || !isStep1Complete || !isStep2Complete || !isStep3Complete
          }
        >
          {isSubmitting ? 'Guardando...' : 'Crear Ingrediente'}
        </Button>
      </div>
    </div>
  );
}
