'use client';

import { usePathname } from 'next/navigation';
import { Nav }from './nav';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname?.startsWith('/stella');

  return (
    <>
      {!hideHeaderFooter && <Nav />}
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
}
