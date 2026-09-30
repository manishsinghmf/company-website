'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { navigationItems } from '@/components/layout/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 lg:hidden"
      >
        <span aria-hidden="true" className="text-xl">
          {isOpen ? '×' : '☰'}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/50"
          />

          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 flex h-full w-[min(85vw,320px)] flex-col bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-xl font-bold tracking-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                VimaTech
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="rounded-lg p-2 text-xl text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                ×
              </button>
            </div>

            <nav aria-label="Mobile primary navigation" className="mt-10">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto border-t border-slate-200 pt-6">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Let&apos;s talk
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}