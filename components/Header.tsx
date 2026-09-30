import Link from 'next/link';

import MobileMenu from '@/components/layout/MobileMenu';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          VimaTech
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}