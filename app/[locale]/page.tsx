import Image from 'next/image';
import Link from 'next/link';
import {CheckCircle2, Sparkles} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Navbar} from './components/navbar';
import {getDictionary} from '@/lib/dictionary';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = getDictionary(locale).home;

  return (
    <main>
      <Navbar locale={locale} />
      <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="absolute right-20 top-20 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="space-y-6">
          <Badge>{t.tagline}</Badge>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">{t.headline}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          <div className="flex gap-3">
            <Button asChild size="lg"><Link href={`/${locale}/courses`}>{t.startNow}</Link></Button>
            <Button asChild variant="outline" size="lg"><Link href={`/${locale}/auth/register`}>{t.freeTrial}</Link></Button>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-3xl bg-card p-4">
            <div><p className="text-2xl font-bold text-primary">50k+</p><p className="text-xs">students</p></div>
            <div><p className="text-2xl font-bold text-accent">10k+</p><p className="text-xs">quizzes</p></div>
            <div><p className="text-2xl font-bold text-highlight">1000+</p><p className="text-xs">lessons</p></div>
          </div>
        </div>
        <Card className="overflow-hidden p-4">
          <Image src="/images/encouragement.svg" alt="Learning encouragement" width={560} height={360} className="w-full" />
          <CardContent className="pt-4 text-sm font-medium">{t.encourage}</CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="about">
        <h2 className="mb-6 text-3xl font-bold">{t.tailoredTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><CardHeader><CardTitle>{t.levels.primary.title}</CardTitle></CardHeader><CardContent>{t.levels.primary.desc}</CardContent></Card>
          <Card><CardHeader><CardTitle>{t.levels.secondary.title}</CardTitle></CardHeader><CardContent>{t.levels.secondary.desc}</CardContent></Card>
          <Card><CardHeader><CardTitle>{t.levels.university.title}</CardTitle></CardHeader><CardContent>{t.levels.university.desc}</CardContent></Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold">{t.stepsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardContent className="pt-6"><CheckCircle2 className="mb-3 h-6 w-6 text-accent" />{t.steps['1']}</CardContent></Card>
          <Card><CardContent className="pt-6"><CheckCircle2 className="mb-3 h-6 w-6 text-accent" />{t.steps['2']}</CardContent></Card>
          <Card><CardContent className="pt-6"><CheckCircle2 className="mb-3 h-6 w-6 text-accent" />{t.steps['3']}</CardContent></Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="pricing">
        <h2 className="mb-6 text-3xl font-bold">{t.pricingTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle>{t.pricing.basic.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3"><p className="text-3xl font-bold">{t.pricing.basic.price}</p><p>{t.pricing.basic.desc}</p><Button className="w-full">{t.choosePlan}</Button></CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader><div className="flex items-center justify-between"><CardTitle>{t.pricing.pro.title}</CardTitle><Badge variant="secondary">Most popular</Badge></div></CardHeader>
            <CardContent className="space-y-3"><p className="text-3xl font-bold">{t.pricing.pro.price}</p><p>{t.pricing.pro.desc}</p><Button className="w-full">{t.choosePlan}</Button></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t.pricing.premium.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3"><p className="text-3xl font-bold">{t.pricing.premium.price}</p><p>{t.pricing.premium.desc}</p><Button className="w-full">{t.choosePlan}</Button></CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          <div><p className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="h-5 w-5 text-highlight" />ShikhonLab</p></div>
          <div><h3 className="font-semibold">Platform</h3><ul className="space-y-2 text-sm text-muted-foreground"><li>Courses</li><li>Pricing</li><li>Student Portal</li></ul></div>
          <div><h3 className="font-semibold">Company</h3><ul className="space-y-2 text-sm text-muted-foreground"><li>About</li><li>Careers</li><li>Contact</li></ul></div>
          <div><h3 className="font-semibold">Legal</h3><ul className="space-y-2 text-sm text-muted-foreground"><li>Privacy</li><li>Terms</li><li>Cookies</li></ul></div>
        </div>
      </footer>
    </main>
  );
}
