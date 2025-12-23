 
import { auth } from '@/auth';
import { useSession, SessionProvider } from 'next-auth/react';
export default async function Home() {
const session = await auth()
console.log(session)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    </div>
  );
}
