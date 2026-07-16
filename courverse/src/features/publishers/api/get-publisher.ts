import type { GetPublisherResponse } from "../types";
import { publisherRepository } from "./publisher.repository";

export async function getPublisher(
  id: string,
): Promise<GetPublisherResponse> {
  return publisherRepository.getPublisher(id);
}