import LocaleSwitcher from '@/components/locale-switcher';
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
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { Bell, Plus } from 'lucide-react';

export const Route = createFileRoute('/_protected/app/_dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider className="max-h-screen">
      <AppSidebar />

      <SidebarInset className="overflow-y-scroll">
        <header className="flex h-17 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <DropdownMenuContent className="p-2.5 flex flex-col gap-2 text-sm">
                    <Link to="/app/campaigns/new">
                      <DropdownMenuItem className="flex items-center gap-0.5">
                        <Plus size={18} /> Nowa kampania
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/app/sessions/new">
                      <DropdownMenuItem className="flex items-center gap-0.5">
                        <Plus size={18} /> Nowa sesja
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Separator orientation="vertical" className="h-5" />

              <div className="max-w-3xs">
                <NavUser />
              </div>

              <div className="flex gap-1.5">
                <ThemeSwitcher />
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </header>

        <Separator />

        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
