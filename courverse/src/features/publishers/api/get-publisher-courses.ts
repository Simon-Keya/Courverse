import type {
  GetPublisherCoursesDto,
  GetPublisherCoursesResponse,
} from "../types";
import { publisherRepository } from "./publisher.repository";

export async function getPublisherCourses(
  params: GetPublisherCoursesDto,
): Promise<GetPublisherCoursesResponse> {
  return publisherRepository.getPublisherCourses(params);
}
