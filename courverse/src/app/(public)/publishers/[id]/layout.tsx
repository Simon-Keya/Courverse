import type { Metadata } from "next";

type Props = { children: React.ReactNode; params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const api = process.env.NEXT_PUBLIC_API_URL;
  let title = "Publisher";
  let description = "Learn from this publisher on Courverse";
  if (api) {
    try {
      const res = await fetch(`${api}/publishers/${id}`, {
        next: { revalidate: 600 },
      });
      if (res.ok) {
        const p = (await res.json()) as { name?: string; bio?: string };
        title = p.name || title;
        description = p.bio?.slice(0, 160) || description;
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

export default function PublisherLayout({ children }: Props) {
  return children;
}
