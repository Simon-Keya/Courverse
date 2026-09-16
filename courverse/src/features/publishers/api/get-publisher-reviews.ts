import type {
  GetPublisherReviewsDto,
  GetPublisherReviewsResponse,
} from "../types";
import { publisherRepository } from "./publisher.repository";

export async function getPublisherReviews(
  params: GetPublisherReviewsDto,
): Promise<GetPublisherReviewsResponse> {
  return publisherRepository.getPublisherReviews(params);
}
