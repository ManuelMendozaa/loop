import Link from 'next/link';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { SidebarTrigger } from '@/src/common/Sidebar';

interface ProcessFormHeaderProps {
  isSaving: boolean;
  canSave: boolean;
  handleSave: () => void;
  isEditMode?: boolean;
  processName?: string;
}

export function ProcessFormHeader({
  isSaving,
  canSave,
  handleSave,
  isEditMode = false,
  processName,
}: ProcessFormHeaderProps) {
  const title = isEditMode ? processName || 'Editar Proceso' : 'Nuevo Proceso';
  const saveLabel = isEditMode ? 'Guardar Cambios' : 'Guardar Proceso';
  const savingLabel = 'Guardando...';

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/processes">
            <ArrowLeft />
            Procesos
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={isSaving || !canSave}>
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          {isSaving ? savingLabel : saveLabel}
        </Button>
      </div>
    </header>
  );
}
