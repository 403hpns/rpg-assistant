import { NavUser } from '@/components/nav-user';
import { SearchForm } from '@/components/search-form';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { Bell, Plus } from 'lucide-react';

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <SidebarProvider className="max-h-screen">
      <AppSidebar className="" />

      <ThemeSwitcher />

      <SidebarInset className="overflow-y-scroll">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 justify-between w-full">
            <SearchForm />

            <div className="w-full flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Bell size={20} className="hover:scale-110" />
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
                    <Plus size={22} className="hover:scale-110" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to="/app">
                      <DropdownMenuItem>
                        <Plus /> Nowa kampania
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/app">
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
                    name: '403hpns',
                    email: '403hpns@dev.com',
                    avatar: '',
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        <Separator />

        <main className=" p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
});
