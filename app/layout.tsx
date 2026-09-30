import type { Metadata } from 'next';
import './globals.css';
import SiteShell from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: 'Company Website',
  description: 'Our company website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>
          {children}
        </SiteShell>

      </body>
    </html>
  );
}
