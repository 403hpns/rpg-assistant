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
import i18n from '@/utils/i18n/i18n';
import { useRouterState } from '@tanstack/react-router';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { CampaignSwitcher } from './campaign-switcher';
import { SidebarHeader } from './sidebar-header';

const data = {
  user: {
    name: '403hpns',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  navPrimary: [
    {
      title: i18n.t('app.sidebar.tabs.home'),
      url: '/app',
      icon: Home,
    },
    {
      id: 'campaigns',
      title: i18n.t('app.sidebar.tabs.campaigns'),
      url: '/app/campaigns',
      icon: Book,
      badge: '0',
    },
    {
      title: i18n.t('app.sidebar.tabs.sessions'),
      url: '/app/sessions',
      icon: ScrollText,
      badge: '0',
    },
    {
      title: i18n.t('app.sidebar.tabs.calendar'),
      url: '/app/calendar',
      icon: Calendar,
    },
  ],
  navMain: [
    {
      title: i18n.t('app.sidebar.tabs.characters'),
      url: '/app/characters',
      icon: Users,
    },
    {
      title: i18n.t('app.sidebar.tabs.items'),
      url: '#',
      icon: Sword,
      disabled: true,
    },

    {
      title: i18n.t('app.sidebar.tabs.locations'),
      url: '#',
      icon: BookOpen,
      disabled: true,
    },
    {
      title: i18n.t('app.sidebar.tabs.scenes'),
      url: '#',
      icon: Settings2,
      disabled: true,
    },
  ],
  navSecondary: [
    {
      title: i18n.t('app.sidebar.tabs.help'),
      url: '/app/help',
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      title: i18n.t('app.sidebar.tabs.charGen'),
      url: '#',
      icon: Wand2,
      disabled: true,
    },
    {
      title: i18n.t('app.sidebar.tabs.itemGen'),
      url: '#',
      icon: PieChart,
      disabled: true,
    },
    {
      title: i18n.t('app.sidebar.tabs.namesGen'),
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
          items={data.projects.map((item) => ({
            ...item,
            active: isActive(item.url),
          }))}
        />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {open ? (
        <SidebarFooter className="max-w-xs">
          <Card className="bg-linear-to-tr dark:from-muted/80 dark:to-black/90 from-neutral-200 to-white/50">
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
