import { Users, Store, Truck, Package } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/common/Card';

const stats = [
  {
    title: 'Users',
    value: '—',
    description: 'Total registered users',
    icon: Users,
  },
  {
    title: 'Merchants',
    value: '—',
    description: 'Active merchants',
    icon: Store,
  },
  {
    title: 'Providers',
    value: '—',
    description: 'Supply chain providers',
    icon: Truck,
  },
  {
    title: 'Products',
    value: '—',
    description: 'Products in catalog',
    icon: Package,
  },
];

export default function AppPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to Loop Admin
          </h2>
          <p className="text-muted-foreground">
            Manage your supply chain operations from this dashboard.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">{stat.value}</div>
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
