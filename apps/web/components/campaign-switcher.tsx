'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { useCampaigns } from '@/hooks/use-campaigns';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';

export const CampaignSwitcher = () => {
  const { isPending, data: campaignsList } = useCampaigns();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                logo
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <small className="text-muted-foreground">Kampania</small>
                <span className="truncate font-semibold" title="Warhammer">
                  Warhammer
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="relative w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            // side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Kampanie
            </DropdownMenuLabel>

            <div className="max-h-[50dvh] overflow-scroll">
              {!isPending ? (
                campaignsList &&
                campaignsList.map((campaign, index) => (
                  <DropdownMenuItem key={campaign.id} className="gap-2 p-2">
                    <Avatar className="size-6 border rounded-sm text-xs">
                      <AvatarFallback className="rounded-sm">
                        {campaign.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <span className="truncate">{campaign.name}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <SidebarMenuSkeleton />
              )}
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <Link
                href="/dashboard/campaigns/new"
                className="font-medium text-muted-foreground">
                Nowa kampania
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
