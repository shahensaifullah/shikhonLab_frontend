import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {getLevelBySlug} from '@/lib/courses';
import {Navbar} from '../../components/navbar';
import {getDictionary} from '@/lib/dictionary';

export default async function LevelPage({params}: {params: Promise<{locale: string; level: string}>}) {
  const {locale, level} = await params;
  const t = getDictionary(locale).level;
  const levelData = getLevelBySlug(level);

  if (!levelData) notFound();

  return (
    <main>
      <Navbar locale={locale} />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="grid items-center gap-6 p-6 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold">{levelData.title}</h1>
            <p className="mt-3 text-muted-foreground">{t.hero}</p>
          </div>
          <Image src="/images/encouragement.svg" alt="Encouragement" width={500} height={260} className="w-full" />
        </Card>
        <Card className="border-accent/40 bg-accent/5"><CardContent className="pt-6 text-lg font-medium">{t.encourage}</CardContent></Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levelData.subjects.map((subject) => (
            <Card key={subject}><CardContent className="flex items-center justify-between pt-6"><span>{subject}</span><Button asChild size="sm"><Link href={`/${locale}/courses/${level}/${subject.toLowerCase().replace(/\s+/g, '-')}`}>{t.viewSubject} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></CardContent></Card>
          ))}
        </div>
      </section>
    </main>
  );
}
