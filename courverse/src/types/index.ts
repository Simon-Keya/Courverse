/**
 * Shared domain types. Prefer feature-specific types under @/types/course
 * and API module types under @/api/modules/* when more specific shapes are needed.
 */
export type { Course, Category, Publisher, Testimonial } from "./course";
export type { AuthUser, AuthResponse, LoginPayload, SignupPayload } from "@/api/modules/auth";
