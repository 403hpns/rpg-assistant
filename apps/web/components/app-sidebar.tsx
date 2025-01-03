'use client';
import * as React from 'react';
import {
  Book,
  BookOpen,
  Calendar,
  Dices,
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
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavPrimary } from './nav-primary';

import { CampaignSwitcher } from './campaign-switcher';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardDescription, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { usePathname } from 'next/navigation';

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
      title: 'Kampanie',
      url: '/dashboard/campaigns',
      icon: Book,
      badge: '3',
    },
    {
      title: 'Sesje',
      url: '/dashboard/sessions',
      icon: ScrollText,
      badge: '21',
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
  const { user } = useAuth();
  const pathname = usePathname();

  React.useEffect(() => {
    console.log(user);
  }, []);

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-2 items-center p-3">
          <Link href="/dashboard" className="flex gap-2 items-center">
            <Dices />
            <strong>TRPG Assistant</strong>
          </Link>
          <SidebarTrigger className="ml-auto" />
        </div>

        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <CampaignSwitcher />

        <NavPrimary
          items={data.navPrimary.map((item) => ({
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
      <SidebarFooter>
        <Card className="bg-gradient-to-tr from-muted/80 to-black/90">
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
      <Separator />
    </Sidebar>
  );
}
