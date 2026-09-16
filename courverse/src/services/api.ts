/**
 * @deprecated Prefer @/api/client and @/api/modules/*.
 * Re-exports the canonical Axios client for backward compatibility.
 */
export { default as apiClient, apiClient as default } from "@/api/client";
export type { ApiError } from "@/api/client";
