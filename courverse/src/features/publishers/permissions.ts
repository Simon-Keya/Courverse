export const publisherPermissions = {
  canManage: (role?: string) =>
    role === "publisher" || role === "admin" || role === "super_admin",
  canViewAdmin: (role?: string) =>
    role === "admin" || role === "super_admin",
};
