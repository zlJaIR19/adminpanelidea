"use client";
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Standalone pages (like login) that don't need the admin layout
  const standalonePages = ['/login', '/register', '/forgot-password'];
  const isStandalonePage = standalonePages.includes(pathname);

  if (isStandalonePage) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0, fontFamily: inter.style.fontFamily }}>
          {children}
        </body>
      </html>
    );
  }

  // Default layout with sidebar and header
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: inter.style.fontFamily }}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
