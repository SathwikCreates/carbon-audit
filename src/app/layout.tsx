import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Emission Audit',
  description: 'Calculate CO₂e emissions from your invoices using AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
