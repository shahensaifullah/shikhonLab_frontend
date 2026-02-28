export type CourseLevel = {
  slug: string;
  title: string;
  subjects: string[];
};

export const courseLevels: CourseLevel[] = [
  {slug: 'class-3', title: 'Class 3', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'class-4', title: 'Class 4', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'class-5', title: 'Class 5', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'class-6', title: 'Class 6', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'class-7', title: 'Class 7', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'class-8', title: 'Class 8', subjects: ['Bangla', 'English', 'Math', 'Science']},
  {slug: 'ssc', title: 'SSC', subjects: ['Bangla', 'English', 'Physics', 'Chemistry', 'Biology', 'Higher Math']},
  {slug: 'hsc', title: 'HSC', subjects: ['Bangla', 'English', 'Physics', 'Chemistry', 'Biology', 'Higher Math']}
];

export const fakeLessons = ['Introduction', 'Core Concepts', 'Practice Session', 'Revision'];
export const fakeQuizzes = ['Quick Quiz 1', 'Model Test', 'Challenge Quiz'];

export const getLevelBySlug = (slug: string) => courseLevels.find((level) => level.slug === slug);
