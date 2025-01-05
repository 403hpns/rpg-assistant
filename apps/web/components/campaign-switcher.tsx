'use client';

import Link from 'next/link';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useCampaigns } from '@/hooks/use-campaigns';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export const CampaignSwitcher = () => {
  const { campaigns, currentCampaign, isLoading, switchCampaign, error } =
    useCampaigns();
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {error ? (
              <small className="m-4 text-muted-foreground ">
                Brak kampani :(
              </small>
            ) : isLoading || !campaigns.length ? (
              <div className="p-2 flex items-center gap-2">
                <Skeleton className="h-8 w-8 aspect-square" />
                <div className="flex flex-col gap-0.5">
                  <Skeleton className="h-2 w-[100px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="mx-auto data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {currentCampaign?.name.slice(0, 2)}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <small className="text-muted-foreground">Kampania</small>
                  <span className="truncate font-semibold" title="Warhammer">
                    {currentCampaign?.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            )}
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
              {!isLoading ? (
                campaigns ? (
                  campaigns.map((campaign, index) => (
                    <DropdownMenuItem
                      key={campaign.id}
                      className="gap-2 p-2"
                      onClick={() => switchCampaign(campaign.id)}>
                      <Avatar className="size-6 border rounded-sm text-xs">
                        <AvatarFallback className="rounded-sm">
                          {campaign.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="truncate">{campaign.name}</span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <small className="p-2 text-muted-foreground">
                    Brak kampani
                  </small>
                )
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
