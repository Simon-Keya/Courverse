export interface Publisher {
  id: string;
  name: string;
  slug: string;
  avatarUrl: string;
  bio: string;
  studentsCount: number;
  coursesCount: number;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  publisher: Pick<Publisher, "id" | "name" | "avatarUrl">;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  price: number;
  isPremium: boolean;
  progress?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}
