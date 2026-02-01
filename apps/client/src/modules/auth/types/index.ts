import { z } from 'zod';
import {
  Shield,
  Users,
  Settings,
  Eye,
  Package,
  Truck,
  LucideIcon,
} from 'lucide-react';

export const RoleSchema = z.enum([
  'admin',
  'manager',
  'operator',
  'viewer',
  'inventory',
  'logistics',
]);

export type Role = z.infer<typeof RoleSchema>;

export interface RoleInfo {
  value: Role;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const ROLES: RoleInfo[] = [
  {
    value: 'admin',
    label: 'Administrador',
    description: 'Acceso completo a todas las funciones del sistema',
    icon: Shield,
  },
  {
    value: 'manager',
    label: 'Gerente',
    description: 'Gestión de usuarios, procesos y reportes',
    icon: Users,
  },
  {
    value: 'operator',
    label: 'Operador',
    description: 'Ejecución de procesos y tareas operativas',
    icon: Settings,
  },
  {
    value: 'viewer',
    label: 'Visualizador',
    description: 'Solo lectura de información del sistema',
    icon: Eye,
  },
  {
    value: 'inventory',
    label: 'Inventario',
    description: 'Gestión de ingredientes y productos',
    icon: Package,
  },
  {
    value: 'logistics',
    label: 'Logística',
    description: 'Gestión de proveedores y envíos',
    icon: Truck,
  },
];

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrador',
  manager: 'Gerente',
  operator: 'Operador',
  viewer: 'Visualizador',
  inventory: 'Inventario',
  logistics: 'Logística',
};
