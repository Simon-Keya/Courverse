import type {
  Publisher,
  PublisherStatistics,
  SocialLinks,
} from "./publisher";
import type { PublisherCourse } from "./course";
import type { PublisherReview, ReviewSummary } from "./review";

/* -------------------------------------------------------------------------- */
/*                                   COMMON                                   */
/* -------------------------------------------------------------------------- */

export interface PaginationDto {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/* -------------------------------------------------------------------------- */
/*                                  REQUESTS                                  */
/* -------------------------------------------------------------------------- */

export interface GetPublishersDto extends PaginationDto {
  search?: string;
  category?: string;
  featured?: boolean;
  verified?: boolean;
  sort?:
    | "latest"
    | "oldest"
    | "popular"
    | "students"
    | "courses"
    | "rating";
}

export interface GetPublisherDto {
  id: string;
}

export interface GetPublisherCoursesDto extends PaginationDto {
  publisherId: string;
  category?: string;
  level?: string;
  search?: string;
}

export interface GetPublisherReviewsDto extends PaginationDto {
  publisherId: string;
  rating?: number;
}

/* -------------------------------------------------------------------------- */
/*                                  RESPONSES                                 */
/* -------------------------------------------------------------------------- */

export interface GetPublisherResponse {
  publisher: Publisher;
}

export interface GetPublishersResponse
  extends PaginatedResponse<Publisher> {}

export interface GetPublisherCoursesResponse
  extends PaginatedResponse<PublisherCourse> {}

export interface GetPublisherReviewsResponse
  extends PaginatedResponse<PublisherReview> {
  summary: ReviewSummary;
}

/* -------------------------------------------------------------------------- */
/*                             ADMIN / PUBLISHER DTO                          */
/* -------------------------------------------------------------------------- */

export interface CreatePublisherDto {
  name: string;
  email: string;
  phone?: string;

  slug: string;

  description?: string;

  tagline?: string;

  logo?: string;

  banner?: string;

  socials?: SocialLinks;
}

export interface UpdatePublisherDto
  extends Partial<CreatePublisherDto> {
  statistics?: Partial<PublisherStatistics>;

  verified?: boolean;

  featured?: boolean;
}