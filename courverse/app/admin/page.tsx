

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <span
            className="btn btn-primary cursor-pointer"
            onClick={() => window.location.href = "/admin/courses"}
          >
            Manage Courses
          </span>
          <span
            className="btn btn-secondary cursor-pointer"
            onClick={() => window.location.href = "/admin/users"}
          >
            Manage Users
          </span>
          <span
            className="btn btn-accent cursor-pointer"
            onClick={() => window.location.href = "/admin/reports"}
          >
            View Reports
          </span>
        </div>
      </div>
    </div>
  );
}
