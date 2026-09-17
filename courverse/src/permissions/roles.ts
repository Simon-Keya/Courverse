/**
 * Canonical roles and route → role map.
 * Backend JWT `role` claim must match these string values.
 * Middleware RBAC is UX only — API authorization is authoritative.
 */

export type AppRole = "learner" | "publisher" | "admin" | "super_admin";

export const ALL_ROLES: AppRole[] = [
  "learner",
  "publisher",
  "admin",
  "super_admin",
];

/** Prefix → roles allowed to enter that area */
export const ROUTE_ROLE_MAP: { prefix: string; roles: AppRole[] }[] = [
  {
    prefix: "/admin",
    roles: ["admin", "super_admin"],
  },
  {
    prefix: "/publisher",
    roles: ["publisher", "admin", "super_admin"],
  },
  {
    prefix: "/dashboard",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/my-learning",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/rewards",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/certificates",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/profile",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/notifications",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
  {
    prefix: "/wishlist",
    roles: ["learner", "publisher", "admin", "super_admin"],
  },
];

export function roleHome(role: AppRole | string | undefined): string {
  switch (role) {
    case "admin":
    case "super_admin":
      return "/admin/dashboard";
    case "publisher":
      return "/publisher/dashboard";
    default:
      return "/dashboard";
  }
}

export function rolesForPath(pathname: string): AppRole[] | null {
  const hit = ROUTE_ROLE_MAP.find(
    (r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`),
  );
  return hit ? hit.roles : null;
}

export function isRoleAllowed(
  pathname: string,
  role: string | undefined | null,
): boolean {
  const allowed = rolesForPath(pathname);
  if (!allowed) return true;
  if (!role) return false;
  return allowed.includes(role as AppRole);
}
