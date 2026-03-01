'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {locales} from '@/i18n/routing';
import {Button} from '@/components/ui/button';

export function LanguageSwitcher({locale}: {locale: string}) {
  const pathname = usePathname();

  const getPathForLocale = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return `/${locale}`;
    }

    if (locales.includes(segments[0] as (typeof locales)[number])) {
      segments[0] = locale;
      return `/${segments.join('/')}`;
    }

    return `/${locale}${pathname}`;
  };

  const nextLocale = locale === 'en' ? 'de' : 'en';

  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={getPathForLocale(nextLocale)}>{nextLocale.toUpperCase()}</Link>
    </Button>
  );
}
