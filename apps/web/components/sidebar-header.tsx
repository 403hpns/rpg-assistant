import Link from 'next/link';
import { Dices } from 'lucide-react';
import {
  SidebarHeader as SHeader,
  SidebarTrigger,
  useSidebar,
} from './ui/sidebar';
import { Separator } from './ui/separator';

export function SidebarHeader() {
  const { open } = useSidebar();

  return (
    <SHeader>
      <div
        className={`flex gap-2 items-center p-3 ${!open && 'flex-col items-center'}`}>
        <Link href="/dashboard" className="flex gap-2 items-center">
          <Dices />
          {open && <strong>TRPG Assistant</strong>}
        </Link>
        <SidebarTrigger className={`${open ? 'ml-auto' : 'text-center'}`} />
      </div>

      <Separator />
    </SHeader>
  );
}
