import {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {locales} from '@/i18n/routing';
import {Providers} from './providers';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return <Providers locale={locale} messages={messages}>{children}</Providers>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
