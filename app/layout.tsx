import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SheeshaTonight - Premium Sheesha Rental',
  description: 'Luxury sheesha rental and tobacco marketplace for UAE and UK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-amber-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
