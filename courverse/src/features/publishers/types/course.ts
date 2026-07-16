export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "ALL_LEVELS";

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PublisherCourse {
  id: string;

  slug: string;

  title: string;

  subtitle?: string;

  thumbnail: string;

  trailer?: string;

  description: string;

  price: number;

  discountPrice?: number;

  currency: string;

  rating: number;

  reviews: number;

  students: number;

  duration: number;

  lessons: number;

  language: string;

  level: CourseLevel;

  category: CourseCategory;

  published: boolean;

  featured: boolean;

  bestseller: boolean;

  createdAt: string;

  updatedAt: string;
}