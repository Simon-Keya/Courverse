import type { GetPublishersDto, GetPublishersResponse } from "../types";
import { publisherRepository } from "./publisher.repository";

export async function getPublishers(
  params: Partial<GetPublishersDto> = {},
): Promise<GetPublishersResponse> {
  return publisherRepository.getPublishers(params);
}
