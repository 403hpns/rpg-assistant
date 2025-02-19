'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Badge } from '../ui/badge';

export function NavPrimary({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    badge?: string;
    active?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  active?: boolean;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ogólne</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={`${item.active && 'bg-muted/25 border border-muted rounded'}`}
          >
            <SidebarMenuButton asChild tooltip={item.title}>
              <a href={item.url}>
                <item.icon />
                <span className="w-full flex items-center justify-between">
                  {item.title}{' '}
                  {item.badge && (
                    <Badge variant="secondary">{item.badge}</Badge>
                  )}
                </span>
              </a>
            </SidebarMenuButton>
            {item.items?.length ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
