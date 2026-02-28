import {notFound} from 'next/navigation';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {fakeLessons, fakeQuizzes, getLevelBySlug} from '@/lib/courses';
import {Navbar} from '../../../components/navbar';

export default async function SubjectPage({params}: {params: Promise<{locale: string; level: string; subject: string}>}) {
  const {locale, level, subject} = await params;
  const levelData = getLevelBySlug(level);

  if (!levelData) notFound();

  const subjectName = subject.replace(/-/g, ' ');

  return (
    <main>
      <Navbar locale={locale} />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <Badge>{levelData.title}</Badge>
          <h1 className="mt-3 text-4xl font-bold capitalize">{subjectName}</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Lessons</CardTitle></CardHeader>
            <CardContent className="space-y-3">{fakeLessons.map((lesson) => <div key={lesson} className="rounded-2xl border p-3">{lesson}</div>)}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quizzes</CardTitle></CardHeader>
            <CardContent className="space-y-3">{fakeQuizzes.map((quiz) => <div key={quiz} className="rounded-2xl border p-3">{quiz}</div>)}</CardContent>
          </Card>
        </div>
        <Button size="lg">Start lesson</Button>
      </section>
    </main>
  );
}
