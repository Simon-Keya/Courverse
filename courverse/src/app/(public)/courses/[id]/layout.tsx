import type { Metadata } from "next";

type Props = { children: React.ReactNode; params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const api = process.env.NEXT_PUBLIC_API_URL;
  let title = "Course";
  let description = "Learn on Courverse";
  if (api) {
    try {
      const res = await fetch(`${api}/courses/${id}`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const course = (await res.json()) as {
          title?: string;
          shortDescription?: string;
          description?: string;
        };
        title = course.title || title;
        description =
          course.shortDescription ||
          course.description?.slice(0, 160) ||
          description;
      }
    } catch {
      /* ignore */
    }
  }
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function CourseDetailLayout({ children }: Props) {
  return children;
}
