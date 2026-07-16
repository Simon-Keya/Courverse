import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                  Reviewer                                  */
/* -------------------------------------------------------------------------- */

export const reviewUserSchema = z.object({
  id: z.string().uuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  avatar: z
    .string()
    .url()
    .optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Review                                   */
/* -------------------------------------------------------------------------- */

export const publisherReviewSchema = z.object({
  id: z.string().uuid(),

  rating: z
    .number()
    .int()
    .min(1)
    .max(5),

  title: z
    .string()
    .trim()
    .max(150)
    .optional(),

  comment: z
    .string()
    .trim()
    .min(5)
    .max(3000),

  createdAt: z.string(),

  updatedAt: z.string(),

  courseId: z.string().uuid(),

  publisherId: z.string().uuid(),

  user: reviewUserSchema,
});

/* -------------------------------------------------------------------------- */
/*                               Review Summary                               */
/* -------------------------------------------------------------------------- */

export const reviewSummarySchema = z.object({
  average: z
    .number()
    .min(0)
    .max(5),

  total: z.number().int().nonnegative(),

  fiveStars: z.number().int().nonnegative(),

  fourStars: z.number().int().nonnegative(),

  threeStars: z.number().int().nonnegative(),

  twoStars: z.number().int().nonnegative(),

  oneStar: z.number().int().nonnegative(),
});

/* -------------------------------------------------------------------------- */
/*                                   Request                                  */
/* -------------------------------------------------------------------------- */

export const createReviewSchema =
  publisherReviewSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const updateReviewSchema =
  createReviewSchema.partial();

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type PublisherReviewSchema =
  z.infer<typeof publisherReviewSchema>;

export type ReviewSummarySchema =
  z.infer<typeof reviewSummarySchema>;

export type CreateReviewSchema =
  z.infer<typeof createReviewSchema>;

export type UpdateReviewSchema =
  z.infer<typeof updateReviewSchema>;