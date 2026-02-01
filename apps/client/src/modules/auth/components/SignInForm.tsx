'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { toast } from '@/src/common/Sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/common/Card';
import { Field, FieldGroup, FieldLabel } from '@/src/common/Field';
import { useSignIn } from '../services/useSignIn';
import { useRouter } from 'next/navigation';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signInMutation = useSignIn();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await signInMutation.mutateAsync({ email, password });

    if (!response.success) {
      const message = response.error ?? 'Sign in failed';
      toast.error(message);
      setIsLoading(false);
      return;
    }

    localStorage.setItem('token', response.data!.token);

    toast.success('Inicio de sesión exitoso');
    router.push('/app');
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-2">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </Field>
              <Button
                type="submit"
                className="w-full h-10"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin h-4" /> : null}
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
