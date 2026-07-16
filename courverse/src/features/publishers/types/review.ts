export interface PublisherReviewUser {
  id: string;

  name: string;

  avatar?: string;
}

export interface PublisherReview {
  id: string;

  rating: number;

  title?: string;

  comment: string;

  createdAt: string;

  updatedAt: string;

  courseId: string;

  publisherId: string;

  user: PublisherReviewUser;
}

export interface ReviewSummary {
  average: number;

  total: number;

  fiveStars: number;

  fourStars: number;

  threeStars: number;

  twoStars: number;

  oneStar: number;
}