'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { Label } from '@/src/common/Label';
import { toast } from '@/src/common/Sonner';
import { Role, ROLES } from '@/src/modules/auth/types';

type FormStep = 1 | 2;

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role | '';
}

interface UserFormProps {
  onSubmit?: (data: UserFormData) => Promise<void>;
  onCancel?: () => void;
}

export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });

  const updateFormData = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: General information validation
  const isStep1Complete = formData.firstName && formData.lastName && formData.email;

  // Step 2: Role validation
  const isStep2Complete = !!formData.role;

  const handleStepClick = (step: FormStep) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && isStep1Complete) {
      setCurrentStep(2);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Complete) {
      setCurrentStep(2);
    }
  };

  const selectRole = (role: Role) => {
    if (formData.role === role) {
      updateFormData('role', '');
    } else {
      updateFormData('role', role);
    }
  };

  const handleSubmit = async () => {
    if (!isStep1Complete || !isStep2Complete) {
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
        toast.success('Usuario creado correctamente');
      }
    } catch {
      toast.error('Error al crear el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepAccessible = (step: FormStep) => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return isStep1Complete;
    }
  };

  const getSelectedRoleText = () => {
    if (!formData.role) return '';
    return ROLES.find((r) => r.value === formData.role)?.label || '';
  };

  return (
    <div className="flex flex-col">
      {/* Step 1: General Information */}
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
              <p className="font-medium">Información general</p>
              {isStep1Complete && currentStep !== 1 && (
                <p className="text-sm text-muted-foreground">
                  {formData.firstName} {formData.lastName} - {formData.email}
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
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre *</Label>
                <Input
                  id="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido *</Label>
                <Input
                  id="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
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

      {/* Step 2: Rol */}
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
              <p className="font-medium">Rol</p>
              {isStep2Complete && currentStep !== 2 && (
                <p className="text-sm text-muted-foreground">
                  {getSelectedRoleText()}
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
            <p className="text-sm text-muted-foreground">
              Selecciona un rol para el usuario.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const isSelected = formData.role === role.value;
                const Icon = role.icon;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => selectRole(role.value)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-muted-foreground/50'
                    }`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{role.label}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {role.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="size-4 text-primary shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !isStep1Complete || !isStep2Complete}
        >
          {isSubmitting ? 'Guardando...' : 'Crear Usuario'}
        </Button>
      </div>
    </div>
  );
}
