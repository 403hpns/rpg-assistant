import type { Metadata } from 'next';
import localFont from 'next/font/local';

import QueryProvider from '../../providers/query-client-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '../../providers/theme-provider';
import { CampaignProvider } from '@/contexts/campaign-context';
import { Toaster } from '@/components/ui/toaster';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '@/styles/globals.css';
import { routing } from '../../i18n/routing';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'TRPG Assistant',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <QueryProvider>
      <AuthProvider>
        <CampaignProvider>
          <NextIntlClientProvider messages={messages}>
            <html lang="en" suppressHydrationWarning>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  {children}
                  <Toaster />
                </ThemeProvider>
              </body>
            </html>
          </NextIntlClientProvider>
        </CampaignProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
