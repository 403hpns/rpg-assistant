import { LockKeyhole, type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    active?: boolean;
    disabled?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Obecna kampania</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={`${item.active && 'bg-muted/25 border border-muted rounded'}`}
          >
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link
                to={item.url}
                className={`${item.disabled && 'pointer-events-none'}`}
              >
                <item.icon />
                <span
                  className={`flex items-center justify-between w-full ${item.disabled && 'text-muted-foreground'}`}
                >
                  {item.title} {item.disabled && <LockKeyhole size={16} />}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
