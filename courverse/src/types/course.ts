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
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  publisher: Pick<Publisher, "id" | "name" | "avatarUrl"> & { slug?: string };
  category?: string | Category;
  level?: "Beginner" | "Intermediate" | "Advanced" | string;
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
  sections?: any[];
  publishedAt?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}

/** Normalize backend course shape to the UI-friendly Course type */
export function normalizeCourse(raw: any): Course {
  const difficultyMap: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    all_levels: "All Levels",
  };

  const durationMinutes = raw.durationMinutes ?? 0;
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  const duration =
    hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim() : `${mins}m`;

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    shortDescription: raw.shortDescription,
    thumbnailUrl: raw.thumbnailUrl || "/placeholder-course.jpg",
    publisher: {
      id: raw.publisher?.id || "",
      name: raw.publisher?.name || "Unknown",
      avatarUrl: raw.publisher?.avatarUrl || "https://i.pravatar.cc/150?u=" + (raw.publisher?.id || "x"),
      slug: raw.publisher?.slug,
    },
    category: typeof raw.category === "object" ? raw.category?.name : raw.category,
    level: difficultyMap[raw.difficulty] || raw.level || raw.difficulty || "Beginner",
    difficulty: raw.difficulty,
    rating: Number(raw.rating) || 0,
    reviewCount: raw.ratingCount ?? raw.reviewCount ?? 0,
    ratingCount: raw.ratingCount ?? 0,
    studentsCount: raw.enrollmentCount ?? raw.studentsCount ?? 0,
    enrollmentCount: raw.enrollmentCount ?? 0,
    duration,
    durationMinutes,
    lessonsCount: raw.lessonCount ?? raw.lessonsCount ?? 0,
    lessonCount: raw.lessonCount ?? 0,
    price: Number(raw.price) || 0,
    isPremium: raw.isPremium ?? false,
    isFree: raw.isFree ?? Number(raw.price) === 0,
    progress: raw.progress,
    status: raw.status,
    learningOutcomes: raw.learningOutcomes,
    requirements: raw.requirements,
    tags: raw.tags,
    sections: raw.sections,
    publishedAt: raw.publishedAt,
    createdAt: raw.createdAt,
  };
}
