export const publisherProfile = {
  id: "p1",
  name: "Amara Okafor",
  email: "amara@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=32",
  payoutMethod: "Bank transfer (**** 4821)",
};

export const publisherStats = {
  totalStudents: 84200,
  totalRevenue: 128400,
  revenueThisMonth: 9840,
  avgRating: 4.9,
  activeCourses: 12,
  completionRate: 68,
};

export const publisherCourses = [
  { id: "c1", title: "React Masterclass: From Fundamentals to Production", status: "published", students: 18400, revenue: 42300, rating: 4.9, lastUpdated: "Jul 10, 2026" },
  { id: "c5", title: "TypeScript for JavaScript Developers", status: "published", students: 15600, revenue: 0, rating: 4.8, lastUpdated: "Jun 22, 2026" },
  { id: "c7", title: "Git & GitHub Essentials", status: "published", students: 21200, revenue: 0, rating: 4.8, lastUpdated: "May 2, 2026" },
  { id: "d1", title: "Advanced React Patterns", status: "draft", students: 0, revenue: 0, rating: 0, lastUpdated: "Jul 15, 2026" },
  { id: "d2", title: "Next.js App Router Deep Dive", status: "review", students: 0, revenue: 0, rating: 0, lastUpdated: "Jul 12, 2026" },
];

export const publisherQuizzes = [
  { id: "q1", title: "Core Concepts Quiz", course: "React Masterclass", questions: 10, avgScore: 82, attempts: 4210 },
  { id: "q2", title: "TypeScript Basics Check", course: "TypeScript for JS Developers", questions: 8, avgScore: 76, attempts: 3120 },
  { id: "q3", title: "Git Workflow Quiz", course: "Git & GitHub Essentials", questions: 6, avgScore: 91, attempts: 5890 },
];

export const publisherStudents = [
  { id: "s1", name: "Grace Mwangi", avatarUrl: "https://i.pravatar.cc/150?img=5", course: "React Masterclass", progress: 72, enrolledDate: "Jun 2, 2026" },
  { id: "s2", name: "Miguel Santos", avatarUrl: "https://i.pravatar.cc/150?img=15", course: "TypeScript for JavaScript Developers", progress: 100, enrolledDate: "Apr 18, 2026" },
  { id: "s3", name: "Priya Nair", avatarUrl: "https://i.pravatar.cc/150?img=25", course: "React Masterclass", progress: 34, enrolledDate: "Jul 1, 2026" },
  { id: "s4", name: "Daniel Otieno", avatarUrl: "https://i.pravatar.cc/150?img=51", course: "Git & GitHub Essentials", progress: 100, enrolledDate: "Mar 9, 2026" },
  { id: "s5", name: "Wanjiru Kamau", avatarUrl: "https://i.pravatar.cc/150?img=44", course: "React Masterclass", progress: 55, enrolledDate: "May 27, 2026" },
];

export const publisherEarningsHistory = [
  { id: "e1", month: "Jan", amount: 6200 },
  { id: "e2", month: "Feb", amount: 7100 },
  { id: "e3", month: "Mar", amount: 6800 },
  { id: "e4", month: "Apr", amount: 8300 },
  { id: "e5", month: "May", amount: 9100 },
  { id: "e6", month: "Jun", amount: 8700 },
  { id: "e7", month: "Jul", amount: 9840 },
];

export const publisherPayouts = [
  { id: "pay1", date: "Jul 1, 2026", amount: 8700, status: "paid" },
  { id: "pay2", date: "Jun 1, 2026", amount: 9100, status: "paid" },
  { id: "pay3", date: "May 1, 2026", amount: 8300, status: "paid" },
];

export const publisherAnalytics = {
  enrollmentTrend: [
    { label: "Week 1", value: 420 },
    { label: "Week 2", value: 380 },
    { label: "Week 3", value: 510 },
    { label: "Week 4", value: 640 },
    { label: "Week 5", value: 590 },
    { label: "Week 6", value: 710 },
  ],
  trafficSources: [
    { label: "Search", value: 42 },
    { label: "Direct", value: 26 },
    { label: "Referral", value: 18 },
    { label: "Social", value: 14 },
  ],
  topCourses: [
    { title: "React Masterclass", views: 84200, conversion: 21.8 },
    { title: "Git & GitHub Essentials", views: 61300, conversion: 34.6 },
    { title: "TypeScript for JS Developers", views: 52100, conversion: 29.9 },
  ],
};

export const publisherCertificatesIssued = [
  { id: "pc1", learner: "Miguel Santos", course: "TypeScript for JavaScript Developers", issuedDate: "Jul 4, 2026" },
  { id: "pc2", learner: "Daniel Otieno", course: "Git & GitHub Essentials", issuedDate: "Jun 20, 2026" },
  { id: "pc3", learner: "Grace Mwangi", course: "Git & GitHub Essentials", issuedDate: "Jun 2, 2026" },
];
