import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppAuthProvider } from '@/hooks/use-auth.tsx';

export const metadata: Metadata = {
  title: 'Manila Prime Staycation',
  description: 'Professional Property Management System',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👑</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </head>
      <body className="antialiased">
        <AppAuthProvider>
            {children}
            <Toaster />
        </AppAuthProvider>
      </body>
    </html>
  );
}
