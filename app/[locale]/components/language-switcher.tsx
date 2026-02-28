'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {locales} from '@/i18n/routing';
import {Button} from '@/components/ui/button';

export function LanguageSwitcher() {
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

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href={getPathForLocale('bn')}>BN</Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={getPathForLocale('en')}>EN</Link>
      </Button>
    </div>
  );
}
