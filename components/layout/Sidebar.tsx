import Link from 'next/link';
import { navigationItems } from '@/components/layout/navigation';

export default function Sidebar() {
  return (
    <aside className="hidden border-r border-slate-200 bg-slate-950 text-white lg:flex lg:min-h-screen lg:flex-col">
      <div className="flex h-full flex-col p-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          VimaTech
        </Link>

        <nav
          aria-label="Primary navigation"
          className="mt-10"
        >
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-slate-800 pt-6">
          <p className="text-sm font-medium text-white">Build something great.</p>

          <Link
            href="/contact"
            className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </aside>
  );
}