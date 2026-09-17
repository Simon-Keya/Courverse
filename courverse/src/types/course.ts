import { z } from "zod";

export const publisherRefSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    avatarUrl: z.string().optional().nullable(),
  })
  .passthrough();

export const categorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().optional().nullable(),
    courseCount: z.number().optional(),
    icon: z.string().optional(),
  })
  .passthrough();

export const lessonSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    type: z.string().optional(),
    videoUrl: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    durationMinutes: z.number().optional(),
    orderIndex: z.number().optional(),
    isPreview: z.boolean().optional(),
  })
  .passthrough();

export const sectionSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    orderIndex: z.number().optional(),
    lessons: z.array(lessonSchema).optional(),
  })
  .passthrough();

/** Loose API course — extra fields allowed */
export const courseApiSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional().nullable(),
    shortDescription: z.string().optional().nullable(),
    thumbnailUrl: z.string().optional().nullable(),
    publisher: publisherRefSchema.optional().nullable(),
    publisherId: z.string().optional(),
    category: z.union([z.string(), categorySchema]).optional().nullable(),
    categoryId: z.string().optional(),
    difficulty: z.string().optional().nullable(),
    level: z.string().optional().nullable(),
    rating: z.number().optional().nullable(),
    reviewCount: z.number().optional().nullable(),
    ratingCount: z.number().optional().nullable(),
    studentsCount: z.number().optional().nullable(),
    enrollmentCount: z.number().optional().nullable(),
    durationMinutes: z.number().optional().nullable(),
    lessonsCount: z.number().optional().nullable(),
    lessonCount: z.number().optional().nullable(),
    price: z.number().optional().nullable(),
    isPremium: z.boolean().optional().nullable(),
    isFree: z.boolean().optional().nullable(),
    status: z.string().optional().nullable(),
    learningOutcomes: z.array(z.string()).optional().nullable(),
    requirements: z.array(z.string()).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
    sections: z.array(sectionSchema).optional().nullable(),
    publishedAt: z.string().optional().nullable(),
    createdAt: z.string().optional().nullable(),
  })
  .passthrough();

export type CourseApi = z.infer<typeof courseApiSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Lesson = z.infer<typeof lessonSchema>;

export interface Publisher {
  id: string;
  name: string;
  slug?: string;
  avatarUrl?: string;
  bio?: string;
  studentsCount?: number;
  coursesCount?: number;
  rating?: number;
  website?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  courseCount?: number;
  icon?: string;
}

/** UI-facing course model */
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  publisher: Pick<Publisher, "id" | "name" | "avatarUrl"> & { slug?: string };
  category?: string | Category;
  level?: string;
  difficulty?: string;
  rating: number;
  reviewCount?: number;
  ratingCount?: number;
  studentsCount?: number;
  enrollmentCount?: number;
  duration?: string;
  durationMinutes?: number;
  lessonsCount?: number;
  lessonCount?: number;
  price: number;
  isPremium?: boolean;
  isFree?: boolean;
  progress?: number;
  status?: string;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
  sections?: Section[];
  publishedAt?: string;
  createdAt?: string;
}

const difficultyMap: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  all_levels: "All Levels",
};

/**
 * Parse + normalize API course payloads at the boundary.
 * Invalid payloads still produce a best-effort Course when id+title exist.
 */
export function normalizeCourse(raw: unknown): Course {
  const parsed = courseApiSchema.safeParse(raw);
  const data = parsed.success ? parsed.data : (raw as CourseApi);

  const durationMinutes = data.durationMinutes ?? 0;
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  const duration =
    hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim() : `${mins}m`;

  const publisher = data.publisher
    ? {
        id: data.publisher.id,
        name: data.publisher.name,
        avatarUrl: data.publisher.avatarUrl ?? undefined,
        slug: data.publisher.slug,
      }
    : { id: data.publisherId ?? "unknown", name: "Publisher" };

  const difficulty = data.difficulty
    ? difficultyMap[data.difficulty] || data.difficulty
    : data.level;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug ?? data.id,
    description: data.description ?? "",
    shortDescription: data.shortDescription ?? undefined,
    thumbnailUrl: data.thumbnailUrl || "/placeholder-course.jpg",
    publisher,
    category: data.category ?? undefined,
    level: difficulty,
    difficulty: data.difficulty ?? undefined,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? data.ratingCount ?? 0,
    ratingCount: data.ratingCount ?? data.reviewCount ?? 0,
    studentsCount: data.studentsCount ?? data.enrollmentCount ?? 0,
    enrollmentCount: data.enrollmentCount ?? data.studentsCount ?? 0,
    duration,
    durationMinutes,
    lessonsCount: data.lessonsCount ?? data.lessonCount ?? 0,
    lessonCount: data.lessonCount ?? data.lessonsCount ?? 0,
    price: data.price ?? 0,
    isPremium: data.isPremium ?? false,
    isFree: data.isFree ?? (data.price ?? 0) === 0,
    status: data.status ?? undefined,
    learningOutcomes: data.learningOutcomes ?? undefined,
    requirements: data.requirements ?? undefined,
    tags: data.tags ?? undefined,
    sections: data.sections ?? undefined,
    publishedAt: data.publishedAt ?? undefined,
    createdAt: data.createdAt ?? undefined,
  };
}
