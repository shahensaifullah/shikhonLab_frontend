'use client';

import Link from 'next/link';
import {useMemo, useState} from 'react';
import {Facebook, Mail} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

export default function LoginPage() {
  const locale = useLocale();
  const t = useTranslations('auth.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const errors = useMemo(() => {
    const nextErrors: Record<string, string> = {};
    if (!email.includes('@')) nextErrors.email = t('errors.email');
    if (password.length < 6) nextErrors.password = t('errors.password');
    return nextErrors;
  }, [email, password, t]);

  const valid = Object.keys(errors).length === 0;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
              <Label htmlFor="remember">{t('remember')}</Label>
            </div>
            <Link href="#" className="text-primary hover:underline">{t('forgot')}</Link>
          </div>
          <Button className="w-full" disabled={!valid}>{t('submit')}</Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline"><Mail className="mr-2 h-4 w-4" />Google</Button>
            <Button variant="outline"><Facebook className="mr-2 h-4 w-4" />Facebook</Button>
          </div>
          <p className="text-sm text-muted-foreground">{t('new')} <Link href={`/${locale}/auth/register`} className="text-primary">{t('register')}</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
