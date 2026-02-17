'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Copy,
  Check,
  Key,
  Shield,
  UserPlus,
  LogIn,
  FileEdit,
  History,
} from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { Badge } from '@/src/common/Badge';
import { Skeleton } from '@/src/common/Skeleton';
import { SidebarTrigger } from '@/src/common/Sidebar';
import { toast } from '@/src/common/Sonner';
import { User, USER_STATUS_LABELS } from '../types';
import { ROLES, Role } from '@/src/modules/auth/types';

// Dummy data for development
const DUMMY_USERS: User[] = [
  {
    id: '1',
    firstName: 'Lourdes',
    lastName: 'Almeida',
    email: 'lourdes@loop.com',
    phone: '+1 234 567 8901',
    status: 'active',
    role: 'admin',
    inviteToken: 'inv_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    firstName: 'Manuel',
    lastName: 'Mendoza',
    email: 'manuel@loop.com',
    phone: '+1 234 567 8902',
    status: 'active',
    role: 'manager',
    inviteToken: 'inv_b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '3',
    firstName: 'Janet',
    lastName: 'Vizcaya',
    email: 'janet@loop.com',
    status: 'active',
    role: 'operator',
    inviteToken: 'inv_c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
];

interface UserActivity {
  id: string;
  type: 'created' | 'login' | 'role_changed' | 'profile_updated' | 'password_reset';
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

const ACTIVITY_ICONS = {
  created: UserPlus,
  login: LogIn,
  role_changed: Shield,
  profile_updated: FileEdit,
  password_reset: Key,
};

const DUMMY_ACTIVITIES: Record<string, UserActivity[]> = {
  '1': [
    {
      id: 'act-1',
      type: 'login',
      description: 'Inició sesión desde Chrome en macOS',
      timestamp: '2024-01-20T14:45:00Z',
    },
    {
      id: 'act-2',
      type: 'profile_updated',
      description: 'Actualizó su número de teléfono',
      timestamp: '2024-01-19T10:30:00Z',
    },
    {
      id: 'act-3',
      type: 'login',
      description: 'Inició sesión desde Safari en iOS',
      timestamp: '2024-01-18T08:15:00Z',
    },
    {
      id: 'act-4',
      type: 'role_changed',
      description: 'Rol cambiado de Gerente a Administrador',
      timestamp: '2024-01-17T16:00:00Z',
      metadata: { from: 'manager', to: 'admin' },
    },
    {
      id: 'act-5',
      type: 'login',
      description: 'Inició sesión desde Chrome en Windows',
      timestamp: '2024-01-16T09:00:00Z',
    },
    {
      id: 'act-6',
      type: 'created',
      description: 'Cuenta creada',
      timestamp: '2024-01-15T10:30:00Z',
    },
  ],
  '2': [
    {
      id: 'act-1',
      type: 'login',
      description: 'Inició sesión desde Firefox en Linux',
      timestamp: '2024-01-20T11:20:00Z',
    },
    {
      id: 'act-2',
      type: 'password_reset',
      description: 'Restableció su contraseña',
      timestamp: '2024-01-18T14:00:00Z',
    },
    {
      id: 'act-3',
      type: 'created',
      description: 'Cuenta creada',
      timestamp: '2024-01-15T10:30:00Z',
    },
  ],
  '3': [
    {
      id: 'act-1',
      type: 'profile_updated',
      description: 'Actualizó su información de contacto',
      timestamp: '2024-01-19T15:45:00Z',
    },
    {
      id: 'act-2',
      type: 'created',
      description: 'Cuenta creada',
      timestamp: '2024-01-15T10:30:00Z',
    },
  ],
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'hace un momento';
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`;

  return formatDateTime(dateString);
}

function UserProfileSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <Skeleton className="size-8" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-48" />
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Skeleton className="size-20 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export function UserProfile() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = DUMMY_USERS.find((u) => u.id === userId);
      setUser(found ?? null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

  const handleCopyToken = async () => {
    if (!user?.inviteToken) return;

    try {
      await navigator.clipboard.writeText(user.inviteToken);
      setIsCopied(true);
      toast.success('Token copiado al portapapeles');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Error al copiar el token');
    }
  };

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/users">
              <ArrowLeft />
              Usuarios
            </Link>
          </Button>
        </header>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Usuario no encontrado</p>
        </main>
      </div>
    );
  }

  const roleInfo = user.role ? ROLES.find((r) => r.value === user.role) : null;
  const RoleIcon = roleInfo?.icon;

  const statusVariant = user.status === 'active' ? 'default' : 'secondary';

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/users">
            <ArrowLeft />
            Usuarios
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h1>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-semibold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant={statusVariant}>
                      {USER_STATUS_LABELS[user.status]}
                    </Badge>
                    {roleInfo && (
                      <Badge variant="outline" className="gap-1.5">
                        {RoleIcon && <RoleIcon className="size-3" />}
                        {roleInfo.label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Mail className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Correo electrónico
                    </p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Phone className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <p className="text-sm font-medium">
                      {user.phone || 'No especificado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Calendar className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Fecha de registro
                    </p>
                    <p className="text-sm font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role & Access */}
            <Card>
              <CardHeader>
                <CardTitle>Rol y acceso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {roleInfo && (
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rol asignado</p>
                      <p className="text-sm font-medium">{roleInfo.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {roleInfo.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Invite Token */}
                {user.inviteToken && (
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="size-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Token de invitación
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="flex w-full items-center justify-between gap-3 rounded-md bg-muted px-3 py-2 text-left transition-all hover:bg-muted/80 active:scale-[0.99]"
                    >
                      <code className="text-sm font-mono truncate">
                        {user.inviteToken}
                      </code>
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background border">
                        {isCopied ? (
                          <Check className="size-4 text-green-600" />
                        ) : (
                          <Copy className="size-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Este token permite al usuario completar su registro.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activity History */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="size-5 text-muted-foreground" />
              <h3 className="font-semibold">Historial de actividad</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />

              <div className="space-y-1">
                {(DUMMY_ACTIVITIES[user.id] || []).map((activity, index) => {
                  const Icon = ACTIVITY_ICONS[activity.type];
                  const isLast = index === (DUMMY_ACTIVITIES[user.id]?.length || 0) - 1;

                  return (
                    <div key={activity.id} className="relative flex gap-4">
                      {/* Icon */}
                      <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-background border">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm">{activity.description}</p>
                            {activity.metadata && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {Object.entries(activity.metadata).map(([key, value]) => (
                                  <span key={key} className="capitalize">
                                    {key}: {value}
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                          <time className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatRelativeTime(activity.timestamp)}
                          </time>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {(!DUMMY_ACTIVITIES[user.id] || DUMMY_ACTIVITIES[user.id].length === 0) && (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No hay actividad registrada
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
