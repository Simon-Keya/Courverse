export const adminProfile = {
  id: "a1",
  name: "Zawadi Mumo",
  email: "zawadi@courverse.com",
  avatarUrl: "https://i.pravatar.cc/150?img=48",
  role: "Super Admin",
};

export const platformStats = {
  totalUsers: 241800,
  totalLearners: 236900,
  totalPublishers: 1140,
  totalCourses: 1284,
  totalRevenue: 1284300,
  revenueThisMonth: 96200,
  pendingReviews: 14,
  openReports: 6,
};

export const adminUsers = [
  { id: "u1", name: "Simon Karanja", email: "simon@example.com", avatarUrl: "https://i.pravatar.cc/150?img=68", role: "learner", status: "active", joined: "Mar 2025" },
  { id: "u2", name: "Amara Okafor", email: "amara@example.com", avatarUrl: "https://i.pravatar.cc/150?img=32", role: "publisher", status: "active", joined: "Jan 2024" },
  { id: "u3", name: "Grace Mwangi", email: "grace@example.com", avatarUrl: "https://i.pravatar.cc/150?img=5", role: "learner", status: "active", joined: "Jun 2025" },
  { id: "u4", name: "Daniel Kim", email: "daniel@example.com", avatarUrl: "https://i.pravatar.cc/150?img=12", role: "publisher", status: "active", joined: "Feb 2024" },
  { id: "u5", name: "Miguel Santos", email: "miguel@example.com", avatarUrl: "https://i.pravatar.cc/150?img=15", role: "learner", status: "suspended", joined: "Apr 2025" },
];

export const adminCoursesQueue = [
  { id: "d1", title: "Advanced React Patterns", publisher: "Amara Okafor", status: "pending_review", submitted: "Jul 15, 2026" },
  { id: "d2", title: "Next.js App Router Deep Dive", publisher: "Amara Okafor", status: "pending_review", submitted: "Jul 12, 2026" },
  { id: "d3", title: "Kubernetes for Beginners", publisher: "Samuel Otieno", status: "pending_review", submitted: "Jul 9, 2026" },
  { id: "c1", title: "React Masterclass: From Fundamentals to Production", publisher: "Amara Okafor", status: "published", submitted: "Feb 2, 2025" },
  { id: "c2", title: "Practical Machine Learning with Python", publisher: "Daniel Kim", status: "published", submitted: "Nov 8, 2024" },
];

export const adminPublishers = [
  { id: "p1", name: "Amara Okafor", avatarUrl: "https://i.pravatar.cc/150?img=32", courses: 12, students: 84200, revenue: 128400, status: "verified" },
  { id: "p2", name: "Daniel Kim", avatarUrl: "https://i.pravatar.cc/150?img=12", courses: 8, students: 61500, revenue: 96200, status: "verified" },
  { id: "p3", name: "Lucia Fernandez", avatarUrl: "https://i.pravatar.cc/150?img=47", courses: 6, students: 39800, revenue: 54100, status: "verified" },
  { id: "p4", name: "Samuel Otieno", avatarUrl: "https://i.pravatar.cc/150?img=51", courses: 5, students: 27300, revenue: 31900, status: "pending" },
];

export const adminCategories = [
  { id: "1", name: "Web Development", courseCount: 128, status: "active" },
  { id: "2", name: "Data Science", courseCount: 94, status: "active" },
  { id: "3", name: "Design", courseCount: 76, status: "active" },
  { id: "4", name: "Business", courseCount: 112, status: "active" },
  { id: "5", name: "Mobile Development", courseCount: 58, status: "active" },
  { id: "6", name: "AI & Machine Learning", courseCount: 71, status: "active" },
];

export const adminRewards = [
  { id: "r1", title: "Gold Badge", type: "badge", timesEarned: 18400, status: "active" },
  { id: "r2", title: "1 Month Plus Free", type: "perk", timesEarned: 2100, status: "active" },
  { id: "r3", title: "Course Voucher ($10)", type: "voucher", timesEarned: 4300, status: "active" },
  { id: "r4", title: "Marathoner Badge", type: "badge", timesEarned: 960, status: "draft" },
];

export const adminReports = [
  { id: "rep1", type: "Inappropriate content", target: "Course: 'Get Rich Trading Crypto'", reporter: "3 users", status: "open", date: "Jul 16, 2026" },
  { id: "rep2", type: "Copyright claim", target: "Course: 'Kubernetes for Beginners'", reporter: "Publisher DMCA form", status: "open", date: "Jul 14, 2026" },
  { id: "rep3", type: "Harassment", target: "User: miguel@example.com", reporter: "1 user", status: "investigating", date: "Jul 11, 2026" },
  { id: "rep4", type: "Spam", target: "Comment on 'React Masterclass'", reporter: "2 users", status: "resolved", date: "Jul 3, 2026" },
];

export const adminLogs = [
  { id: "log1", actor: "system", action: "Payout batch processed ($96,200 to 214 publishers)", time: "Jul 18, 2026 · 06:00" },
  { id: "log2", actor: "Zawadi Mumo", action: "Approved course 'React Server Components Deep Dive'", time: "Jul 17, 2026 · 14:22" },
  { id: "log3", actor: "system", action: "Flagged course 'Get Rich Trading Crypto' for review", time: "Jul 17, 2026 · 09:03" },
  { id: "log4", actor: "Zawadi Mumo", action: "Suspended user miguel@example.com", time: "Jul 16, 2026 · 17:41" },
  { id: "log5", actor: "system", action: "Nightly backup completed", time: "Jul 16, 2026 · 03:00" },
  { id: "log6", actor: "Zawadi Mumo", action: "Updated category 'AI & Machine Learning' description", time: "Jul 15, 2026 · 11:15" },
];

export const adminRevenueTrend = [
  { label: "Feb", value: 812000 },
  { label: "Mar", value: 894000 },
  { label: "Apr", value: 940000 },
  { label: "May", value: 1021000 },
  { label: "Jun", value: 1188000 },
  { label: "Jul", value: 1284300 },
];
