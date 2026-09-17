import type { Metadata } from "next";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const api = process.env.NEXT_PUBLIC_API_URL;
  let title = slug.replace(/-/g, " ");
  let description = `Courses in ${title} on Courverse`;
  if (api) {
    try {
      const res = await fetch(`${api}/categories/slug/${slug}`, {
        next: { revalidate: 600 },
      });
      if (res.ok) {
        const cat = (await res.json()) as {
          name?: string;
          description?: string;
        };
        title = cat.name || title;
        description = cat.description || description;
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

export default function CategoryLayout({ children }: Props) {
  return children;
}
