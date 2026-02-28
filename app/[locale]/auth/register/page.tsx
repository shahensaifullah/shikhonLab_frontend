'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

export default function RegisterPage() {
  const locale = useLocale();
  const t = useTranslations('auth.register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'parent' | ''>('');
  const [agree, setAgree] = useState(false);

  const errors = useMemo(() => {
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 3) nextErrors.name = t('errors.name');
    if (!email.includes('@')) nextErrors.email = t('errors.email');
    if (password.length < 6) nextErrors.password = t('errors.password');
    if (confirmPassword !== password) nextErrors.confirmPassword = t('errors.confirmPassword');
    if (!role) nextErrors.role = t('errors.role');
    if (!agree) nextErrors.agree = t('errors.agree');
    return nextErrors;
  }, [name, email, password, confirmPassword, role, agree, t]);

  const valid = Object.keys(errors).length === 0;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="name">{t('name')}</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} />{errors.name && <p className="text-sm text-red-500">{errors.name}</p>}</div>
          <div className="space-y-2"><Label htmlFor="email">{t('email')}</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="password">{t('password')}</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="confirmPassword">{t('confirmPassword')}</Label><Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
          </div>
          {(errors.password || errors.confirmPassword) && <p className="text-sm text-red-500">{errors.password || errors.confirmPassword}</p>}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">{t('role')}</legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} />{t('student')}</label>
              <label className="flex items-center gap-2"><input type="radio" name="role" value="parent" checked={role === 'parent'} onChange={() => setRole('parent')} />{t('parent')}</label>
            </div>
            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
          </fieldset>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
            <Label htmlFor="agree">{t('agree')}</Label>
          </div>
          {errors.agree && <p className="text-sm text-red-500">{errors.agree}</p>}
          <Button className="w-full" disabled={!valid}>{t('submit')}</Button>
          <p className="text-sm text-muted-foreground">{t('haveAccount')} <Link href={`/${locale}/auth/login`} className="text-primary">{t('login')}</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
