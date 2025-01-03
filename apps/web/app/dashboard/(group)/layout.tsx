import { AppSidebar } from '@/components/app-sidebar';
import { NavUser } from '@/components/nav-user';
import { SearchForm } from '@/components/search-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from '@/lib/auth';
import { Bell, Loader2Icon, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export default async function SidebarLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  console.log(session);

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon size={80} className="animate-spin" />
        </div>
      }>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 justify-between w-full">
              <SearchForm />

              <div className="w-full flex items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Bell size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Powiadomienia</DropdownMenuLabel>
                      <DropdownMenuItem className="text-muted-foreground pointer-events-none">
                        Brak nowych powiadomień
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Plus size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href="/dashboard/campaigns/new">
                        <DropdownMenuItem>
                          <Plus /> Nowa kampania
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/dashboard/sessions/new">
                        <DropdownMenuItem>
                          <Plus /> Nowa sesja
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="min-w-44 w-max">
                  <NavUser
                    user={{
                      name: session.name || '',
                      email: session.email || '',
                      avatar: session.avatar,
                    }}
                  />
                </div>
              </div>
            </div>
          </header>
          <Separator />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </React.Suspense>
  );
}
``;
