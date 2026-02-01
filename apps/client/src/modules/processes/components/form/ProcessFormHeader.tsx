import Link from 'next/link';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { SidebarTrigger } from '@/src/common/Sidebar';

interface ProcessFormHeaderProps {
  isSaving: boolean;
  canSave: boolean;
  handleSave: () => void;
}

export function ProcessFormHeader({
  isSaving,
  canSave,
  handleSave,
}: ProcessFormHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/processes">
            <ArrowLeft />
            Processes
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">New Process</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={isSaving || !canSave}>
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          {isSaving ? 'Saving...' : 'Save Process'}
        </Button>
      </div>
    </header>
  );
}
