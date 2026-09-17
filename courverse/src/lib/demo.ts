export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCKS === "true" && process.env.NODE_ENV !== "production";
}
