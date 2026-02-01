'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Store,
  Truck,
  Package,
  LogOut,
  LayoutDashboard,
  Leaf,
  Workflow,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '@/src/common/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/users', label: 'Users', icon: Users },
  { href: '/app/merchants', label: 'Merchants', icon: Store },
  { href: '/app/providers', label: 'Providers', icon: Truck },
  { href: '/app/products', label: 'Products', icon: Package },
  { href: '/app/ingredients', label: 'Ingredients', icon: Leaf },
  { href: '/app/processes', label: 'Processes', icon: Workflow },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    window.location.href = '/sign-in';
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md font-bold">
              L
            </div>
            <span className="text-lg font-semibold">Loop Admin</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
