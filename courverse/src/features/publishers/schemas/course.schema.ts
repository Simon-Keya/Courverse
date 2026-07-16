import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                   Category                                 */
/* -------------------------------------------------------------------------- */

export const courseCategorySchema = z.object({
  id: z.string().uuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(100),
});

/* -------------------------------------------------------------------------- */
/*                                    Course                                  */
/* -------------------------------------------------------------------------- */

export const publisherCourseSchema = z.object({
  id: z.string().uuid(),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(150),

  title: z
    .string()
    .trim()
    .min(3)
    .max(200),

  subtitle: z
    .string()
    .trim()
    .max(300)
    .optional(),

  thumbnail: z.string().url(),

  trailer: z.string().url().optional(),

  description: z
    .string()
    .trim()
    .min(20),

  price: z.number().nonnegative(),

  discountPrice: z
    .number()
    .nonnegative()
    .nullable()
    .optional(),

  currency: z
    .string()
    .length(3),

  rating: z
    .number()
    .min(0)
    .max(5),

  reviews: z.number().int().nonnegative(),

  students: z.number().int().nonnegative(),

  duration: z.number().int().nonnegative(),

  lessons: z.number().int().positive(),

  language: z.string(),

  level: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
    "ALL_LEVELS",
  ]),

  category: courseCategorySchema,

  published: z.boolean(),

  featured: z.boolean(),

  bestseller: z.boolean(),

  createdAt: z.string(),

  updatedAt: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                  Requests                                  */
/* -------------------------------------------------------------------------- */

export const createPublisherCourseSchema =
  publisherCourseSchema.omit({
    id: true,
    rating: true,
    reviews: true,
    students: true,
    createdAt: true,
    updatedAt: true,
  });

export const updatePublisherCourseSchema =
  createPublisherCourseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type PublisherCourseSchema =
  z.infer<typeof publisherCourseSchema>;

export type CreatePublisherCourseSchema =
  z.infer<typeof createPublisherCourseSchema>;

export type UpdatePublisherCourseSchema =
  z.infer<typeof updatePublisherCourseSchema>;