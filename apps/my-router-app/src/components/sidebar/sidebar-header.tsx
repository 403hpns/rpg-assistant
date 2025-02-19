import { Link } from '@tanstack/react-router';
import { Dices } from 'lucide-react';
import { Separator } from '../ui/separator';
import {
  SidebarHeader as SHeader,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';

export function SidebarHeader() {
  const { open } = useSidebar();

  return (
    <SHeader>
      <div
        className={`flex gap-2 items-center p-3 ${!open && 'flex-col items-center'}`}
      >
        <Link to="/app" className="flex gap-2 items-center">
          <Dices />
          {open && <strong>TRPG Assistant</strong>}
        </Link>
        <SidebarTrigger className={`${open ? 'ml-auto' : 'text-center'}`} />
      </div>

      <Separator />
    </SHeader>
  );
}
