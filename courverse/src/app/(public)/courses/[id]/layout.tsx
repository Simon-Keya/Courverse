import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { children: React.ReactNode; params: Promise<{ id: string }> };

async function fetchCourse(id: string) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return null;
  try {
    const res = await fetch(`${api}/courses/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      title?: string;
      description?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      publisher?: { name?: string };
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await fetchCourse(id);
  const title = course?.title || "Course";
  const description =
    course?.shortDescription ||
    course?.description?.slice(0, 160) ||
    "Learn on Courverse";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: course?.thumbnailUrl ? [{ url: course.thumbnailUrl }] : undefined,
    },
  };
}

export default async function CourseDetailLayout({ children, params }: Props) {
  const { id } = await params;
  const course = await fetchCourse(id);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://courverse.app";

  const jsonLd = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.shortDescription || course.description,
        provider: {
          "@type": "Organization",
          name: course.publisher?.name || "Courverse",
        },
        url: `${site}/courses/${id}`,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Courverse",
        url: site,
      };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
