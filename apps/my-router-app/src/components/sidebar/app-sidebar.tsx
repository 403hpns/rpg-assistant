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
import * as React from 'react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavProjects } from '@/components/sidebar/nav-projects';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavPrimary } from './nav-primary';

import { useCampaigns } from '@/hooks/use-campaigns';
import { useRouterState } from '@tanstack/react-router';
import { CampaignSwitcher } from '../campaign-switcher';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { SidebarHeader } from './sidebar-header';

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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

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
    <Sidebar variant="sidebar" collapsible="none" {...props}>
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
        <SidebarFooter className="max-w-xs">
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
