export type PublisherStatus =
  | "ACTIVE"
  | "PENDING"
  | "SUSPENDED"
  | "REJECTED";

export type PublisherTier =
  | "STANDARD"
  | "PRO"
  | "ENTERPRISE";

export interface SocialLinks {
  website?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
  facebook?: string;
}

export interface PublisherStatistics {
  totalCourses: number;
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  totalCertificates: number;
  completionRate: number;
  totalRevenue: number;
  totalEnrollments: number;
}

export interface Publisher {
  id: string;

  slug: string;

  name: string;

  email: string;

  phone?: string;

  logo?: string;

  banner?: string;

  tagline?: string;

  description?: string;

  verified: boolean;

  featured: boolean;

  status: PublisherStatus;

  tier: PublisherTier;

  socials: SocialLinks;

  statistics: PublisherStatistics;

  createdAt: string;

  updatedAt: string;
}