import type { Publisher } from "../types";

/** Map API payload to domain Publisher. Extend if backend uses snake_case. */
export function mapPublisher(raw: any): Publisher {
  return {
    id: String(raw.id),
    slug: raw.slug ?? raw.id,
    name: raw.name ?? "",
    email: raw.email ?? "",
    phone: raw.phone,
    logo: raw.logo ?? raw.avatarUrl,
    banner: raw.banner,
    tagline: raw.tagline,
    description: raw.description ?? raw.bio,
    verified: Boolean(raw.verified),
    featured: Boolean(raw.featured),
    status: raw.status ?? "ACTIVE",
    tier: raw.tier ?? "STANDARD",
    socials: raw.socials ?? { website: raw.website },
    statistics: raw.statistics ?? {
      totalCourses: raw.coursesCount ?? 0,
      totalStudents: raw.studentsCount ?? 0,
      totalReviews: raw.ratingCount ?? 0,
      averageRating: raw.rating ?? 0,
      totalCertificates: 0,
      completionRate: 0,
      totalRevenue: 0,
      totalEnrollments: raw.studentsCount ?? 0,
    },
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}
