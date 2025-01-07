'use client';

import * as React from 'react';
import {
  Book,
  BookOpen,
  Calendar,
  Home,
  LifeBuoy,
  Map,
  PieChart,
  ScrollText,
  Settings2,
  Sword,
  Users,
  Wand2,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavPrimary } from './nav-primary';

import { CampaignSwitcher } from './campaign-switcher';
import { Separator } from './ui/separator';
import { Card, CardDescription, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { usePathname } from 'next/navigation';
import { SidebarHeader } from './sidebar-header';
import { useCampaigns } from '@/hooks/use-campaigns';

const data = {
  user: {
    name: '403hpns',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  navPrimary: [
    {
      title: 'Ekran startowy',
      url: '/dashboard',
      icon: Home,
    },
    {
      id: 'campaigns',
      title: 'Kampanie',
      url: '/dashboard/campaigns',
      icon: Book,
      badge: '0',
    },
    {
      title: 'Sesje',
      url: '/dashboard/sessions',
      icon: ScrollText,
      badge: '0',
    },
    {
      title: 'Kalendarz',
      url: '/dashboard/calendar',
      icon: Calendar,
    },
  ],
  navMain: [
    {
      title: 'Postacie',
      url: '/dashboard/characters',
      icon: Users,
    },
    {
      title: 'Przedmioty',
      url: '#',
      icon: Sword,
      disabled: true,
    },

    {
      title: 'Lokalizacje',
      url: '#',
      icon: BookOpen,
      disabled: true,
    },
    {
      title: 'Scenografia',
      url: '#',
      icon: Settings2,
      disabled: true,
    },
  ],
  navSecondary: [
    {
      title: 'Pomoc',
      url: '/dashboard/help',
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: 'Generator postaci',
      url: '#',
      icon: Wand2,
      disabled: true,
    },
    {
      name: 'Generator przedmiotów',
      url: '#',
      icon: PieChart,
      disabled: true,
    },
    {
      name: 'Generator imion',
      url: '#',
      icon: Map,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [sidebarData, setSidebarData] = React.useState<typeof data>(data);
  const { open } = useSidebar();
  const { campaigns } = useCampaigns();
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  React.useEffect(() => {
    if (!campaigns) return;

    setSidebarData((prev) => ({
      ...prev,
      navPrimary: prev.navPrimary.map((item) =>
        item.id === 'campaigns'
          ? { ...item, badge: campaigns.length.toString() }
          : item
      ),
    }));
  }, [campaigns]);

  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader />

      <SidebarContent>
        <CampaignSwitcher />

        <NavPrimary
          items={sidebarData.navPrimary.map((item) => ({
            ...item,
            active: isActive(item.url),
          }))}
        />

        <Separator />

        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            active: isActive(item.url),
          }))}
        />

        <Separator />

        <NavProjects
          projects={data.projects.map((item) => ({
            ...item,
            active: isActive(item.url),
          }))}
        />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {open ? (
        <SidebarFooter>
          <Card className="bg-gradient-to-tr dark:from-muted/80 dark:to-black/90 from-neutral-200 to-white/50">
            <CardHeader>
              <CardDescription>
                Aplikacja w trakcie rozwoju. Część funkcjonalności może nie
                działać poprawnie.
                <Progress
                  title="Postęp prac nad projektem"
                  value={15}
                  className="mt-4"
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </SidebarFooter>
      ) : null}

      <Separator />
    </Sidebar>
  );
}
