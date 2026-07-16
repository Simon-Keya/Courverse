import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                Social Links                                */
/* -------------------------------------------------------------------------- */

export const socialLinksSchema = z.object({
  website: z.string().url().optional(),

  twitter: z.string().url().optional(),

  linkedin: z.string().url().optional(),

  github: z.string().url().optional(),

  youtube: z.string().url().optional(),

  facebook: z.string().url().optional(),
});

/* -------------------------------------------------------------------------- */
/*                               Publisher Stats                              */
/* -------------------------------------------------------------------------- */

export const publisherStatisticsSchema = z.object({
  totalCourses: z.number().nonnegative(),

  totalStudents: z.number().nonnegative(),

  totalReviews: z.number().nonnegative(),

  averageRating: z.number().min(0).max(5),

  totalCertificates: z.number().nonnegative(),

  completionRate: z.number().min(0).max(100),

  totalRevenue: z.number().nonnegative(),

  totalEnrollments: z.number().nonnegative(),
});

/* -------------------------------------------------------------------------- */
/*                                 Publisher                                  */
/* -------------------------------------------------------------------------- */

export const publisherSchema = z.object({
  id: z.string().uuid(),

  slug: z.string().min(3).max(100),

  name: z.string().min(2).max(150),

  email: z.email(),

  phone: z.string().optional(),

  logo: z.string().optional(),

  banner: z.string().optional(),

  tagline: z.string().optional(),

  description: z.string().optional(),

  verified: z.boolean(),

  featured: z.boolean(),

  status: z.enum([
    "ACTIVE",
    "PENDING",
    "SUSPENDED",
    "REJECTED",
  ]),

  tier: z.enum([
    "STANDARD",
    "PRO",
    "ENTERPRISE",
  ]),

  socials: socialLinksSchema,

  statistics: publisherStatisticsSchema,

  createdAt: z.string(),

  updatedAt: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                  Requests                                  */
/* -------------------------------------------------------------------------- */

export const createPublisherSchema = publisherSchema.omit({
  id: true,
  statistics: true,
  verified: true,
  featured: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePublisherSchema =
  createPublisherSchema.partial();

export type PublisherSchema = z.infer<typeof publisherSchema>;

export type CreatePublisherSchema = z.infer<
  typeof createPublisherSchema
>;

export type UpdatePublisherSchema = z.infer<
  typeof updatePublisherSchema
>;