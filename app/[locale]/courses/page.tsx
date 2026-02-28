import Link from 'next/link';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {courseLevels} from '@/lib/courses';
import {getDictionary} from '@/lib/dictionary';
import {Navbar} from '../components/navbar';

export default async function CoursesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = getDictionary(locale).courses;

  return (
    <main>
      <Navbar locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">{t.title}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courseLevels.map((level) => (
            <Link key={level.slug} href={`/${locale}/courses/${level.slug}`}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-primary">
                <CardHeader><CardTitle>{level.title}</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {level.subjects.map((subject) => <Badge key={subject} variant="outline">{subject}</Badge>)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
