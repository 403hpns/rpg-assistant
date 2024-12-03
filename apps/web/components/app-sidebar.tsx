"use client";

import * as React from "react";
import {
  Book,
  BookOpen,
  Calendar,
  ChevronsUpDown,
  LifeBuoy,
  Map,
  PieChart,
  Plus,
  ScrollText,
  Send,
  Settings2,
  Sword,
  Users,
  Wand2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/ui/sidebar";
import { NavPrimary } from "./nav-primary";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@repo/ui/components/ui/dropdown-menu";
import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

const data = {
  user: {
    name: "403hpns",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  },
  navPrimary: [
    {
      title: "Ekran startowy",
      url: "/dashboard",
      icon: Book,
    },
    {
      title: "Kampanie",
      url: "/dashboard/campaigns",
      icon: ScrollText,
    },
    {
      title: "Sesje",
      url: "/dashboard/sessions",
      icon: Users,
    },
    {
      title: "Kalendarz",
      url: "#",
      icon: Calendar,
    },
  ],
  navMain: [
    {
      title: "Karty postaci",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Przedmioty",
      url: "#",
      icon: Sword,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Scenografia",
      url: "#",
      icon: Map,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Lokalizacje",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Ustawienia",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Generator postaci",
      url: "#",
      icon: Wand2,
    },
    {
      name: "Generator przedmiotów",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Generator imion",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { isMobile } = useSidebar();

  const { isPending, data: campaignsList } = useQuery({
    queryKey: ["game-campaigns"],
    queryFn: fetchGameCampaigns,
  });

  async function fetchGameCampaigns() {
    const { data } = await apiClient.get("/api/v1/campaigns");
    console.log(data);
    return data.data;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    logo
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold" title="Warhammer">
                      Warhammer
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                // side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Kampanie
                </DropdownMenuLabel>

                {!isPending ? (
                  campaignsList.map((campaign: any, index: number) => (
                    <DropdownMenuItem key={campaign.id} className="gap-2 p-2">
                      <div className="aspect-square flex size-6 items-center justify-center rounded-sm border">
                        {/* <team.logo className="size-4 shrink-0" /> */}
                      </div>
                      <span className="truncate">{campaign.name}</span>
                      <DropdownMenuShortcut>⌘+{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <span>Ładowanie...</span>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Nowa kampania
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary items={data.navPrimary} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "",
            email: user?.email || "",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
