import apiClient from "@/api/client";
import type {
  GetPublisherResponse,
  GetPublishersResponse,
  GetPublisherCoursesResponse,
  GetPublisherReviewsResponse,
  GetPublishersDto,
  GetPublisherCoursesDto,
  GetPublisherReviewsDto,
} from "../types";
import { publisherEndpoints } from "./publisher.endpoints";
import { mapPublisher } from "./publisher.mapper";

export const publisherRepository = {
  async getPublisher(id: string): Promise<GetPublisherResponse> {
    const { data } = await apiClient.get(publisherEndpoints.byId(id));
    const raw = data?.publisher ?? data;
    return { publisher: mapPublisher(raw) };
  },

  async getPublishers(
    params: Partial<GetPublishersDto> = {},
  ): Promise<GetPublishersResponse> {
    const { data } = await apiClient.get(publisherEndpoints.list, { params });
    const list = Array.isArray(data) ? data : data?.data ?? [];
    const meta = data?.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? list.length,
      total: list.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return {
      data: list.map(mapPublisher),
      meta,
    };
  },

  async getPublisherCourses(
    params: GetPublisherCoursesDto,
  ): Promise<GetPublisherCoursesResponse> {
    const { publisherId, ...rest } = params;
    const { data } = await apiClient.get(
      publisherEndpoints.courses(publisherId),
      { params: rest },
    );
    const list = Array.isArray(data) ? data : data?.data ?? [];
    return {
      data: list,
      meta: data?.meta ?? {
        page: params.page ?? 1,
        limit: params.limit ?? list.length,
        total: list.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  async getPublisherReviews(
    params: GetPublisherReviewsDto,
  ): Promise<GetPublisherReviewsResponse> {
    const { publisherId, ...rest } = params;
    const { data } = await apiClient.get(
      publisherEndpoints.reviews(publisherId),
      { params: rest },
    );
    const list = Array.isArray(data) ? data : data?.data ?? [];
    return {
      data: list,
      meta: data?.meta ?? {
        page: params.page ?? 1,
        limit: params.limit ?? list.length,
        total: list.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      summary: data?.summary ?? {
        average: 0,
        total: list.length,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
      },
    };
  },
};
