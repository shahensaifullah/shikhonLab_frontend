'use client';

import Link from 'next/link';
import {BookOpen, GraduationCap} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {LanguageSwitcher} from './language-switcher';
import {ThemeToggle} from './theme-toggle';

export function Navbar({locale}: {locale: string}) {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold text-primary">
          <GraduationCap className="h-6 w-6" />
          ShikhonLab
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}#pricing`} className="text-sm font-medium hover:text-primary">{t('pricing')}</Link>
          <Link href={`/${locale}#about`} className="text-sm font-medium hover:text-primary">{t('about')}</Link>
          <Link href={`/${locale}/courses`} className="text-sm font-medium hover:text-primary">{t('courses')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <Button asChild variant="outline" size="sm"><Link href={`/${locale}/auth/login`}>{t('studentPortal')}</Link></Button>
          <Button asChild variant="outline" size="sm"><Link href={`/${locale}/auth/register`}>{t('parentPortal')}</Link></Button>
          <Button asChild size="sm"><Link href={`/${locale}/auth/login`}><BookOpen className="mr-2 h-4 w-4" />{t('adminLogin')}</Link></Button>
        </div>
      </div>
    </header>
  );
}
