import { getServerSession } from '@/lib/auth';
import Image from 'next/image';

export default async function MyAccountPage() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-2">
        {session.avatar && (
          <Image src={session.avatar} width={100} height={100} alt="Avatar" />
        )}

        <pre>{JSON.stringify(session)}</pre>
      </div>
    </div>
  );
}
