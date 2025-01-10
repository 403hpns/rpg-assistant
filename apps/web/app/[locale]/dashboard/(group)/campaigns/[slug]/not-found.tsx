import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <h2 className="font-black text-7xl">Oops... 404</h2>
      <p>
        Kampania o podanym ID nie istnieje lub nie posiadasz do niej dostępu.
      </p>
      <Link href="/dashboard/campaigns">
        <Button>Wróć</Button>
      </Link>
    </div>
  );
}
