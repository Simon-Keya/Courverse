import { describe, it, expect } from "vitest";
import { isRoleAllowed, roleHome, rolesForPath } from "./roles";

describe("RBAC roles map", () => {
  it("maps admin routes to admin roles only", () => {
    const roles = rolesForPath("/admin/dashboard");
    expect(roles).toEqual(["admin", "super_admin"]);
    expect(isRoleAllowed("/admin/users", "learner")).toBe(false);
    expect(isRoleAllowed("/admin/users", "admin")).toBe(true);
  });

  it("allows publishers on publisher console", () => {
    expect(isRoleAllowed("/publisher/courses", "publisher")).toBe(true);
    expect(isRoleAllowed("/publisher/courses", "learner")).toBe(false);
  });

  it("sends each role to the correct home", () => {
    expect(roleHome("admin")).toBe("/admin/dashboard");
    expect(roleHome("publisher")).toBe("/publisher/dashboard");
    expect(roleHome("learner")).toBe("/dashboard");
  });
});
