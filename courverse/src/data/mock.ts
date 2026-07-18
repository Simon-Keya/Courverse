import { Category, Course, Publisher, Testimonial } from "@/types/course";

export const categories: Category[] = [
  { id: "1", name: "Web Development", slug: "web-development", description: "Build modern websites and web apps.", courseCount: 128, icon: "Code2" },
  { id: "2", name: "Data Science", slug: "data-science", description: "Analyze data and build ML models.", courseCount: 94, icon: "BarChart3" },
  { id: "3", name: "Design", slug: "design", description: "UI, UX, and product design.", courseCount: 76, icon: "Palette" },
  { id: "4", name: "Business", slug: "business", description: "Strategy, marketing, and finance.", courseCount: 112, icon: "Briefcase" },
  { id: "5", name: "Mobile Development", slug: "mobile-development", description: "iOS, Android, and cross-platform.", courseCount: 58, icon: "Smartphone" },
  { id: "6", name: "AI & Machine Learning", slug: "ai-machine-learning", description: "Deep learning and applied AI.", courseCount: 71, icon: "Sparkles" },
];

export const publishers: Publisher[] = [
  { id: "p1", name: "Amara Okafor", slug: "amara-okafor", avatarUrl: "https://i.pravatar.cc/150?img=32", bio: "Senior frontend engineer teaching React and TypeScript since 2016. Previously at Stripe.", studentsCount: 84200, coursesCount: 12, rating: 4.9 },
  { id: "p2", name: "Daniel Kim", slug: "daniel-kim", avatarUrl: "https://i.pravatar.cc/150?img=12", bio: "Data scientist and educator focused on practical, project-based machine learning.", studentsCount: 61500, coursesCount: 8, rating: 4.8 },
  { id: "p3", name: "Lucia Fernandez", slug: "lucia-fernandez", avatarUrl: "https://i.pravatar.cc/150?img=47", bio: "Product designer helping engineers design better interfaces.", studentsCount: 39800, coursesCount: 6, rating: 4.9 },
  { id: "p4", name: "Samuel Otieno", slug: "samuel-otieno", avatarUrl: "https://i.pravatar.cc/150?img=51", bio: "Mobile architect specializing in React Native and Swift.", studentsCount: 27300, coursesCount: 5, rating: 4.7 },
];

export const courses: Course[] = [
  {
    id: "c1", title: "React Masterclass: From Fundamentals to Production", slug: "react-masterclass",
    description: "Learn React 18 the right way — hooks, server components, testing, and real deployment.",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    publisher: { id: "p1", name: "Amara Okafor", avatarUrl: "https://i.pravatar.cc/150?img=32" },
    category: "Web Development", level: "Intermediate", rating: 4.9, reviewCount: 3204, studentsCount: 18400,
    duration: "24h 30m", lessonsCount: 142, price: 49, isPremium: true, progress: 72,
  },
  {
    id: "c2", title: "Practical Machine Learning with Python", slug: "practical-ml-python",
    description: "Build real ML models from scratch: regression, classification, and neural networks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    publisher: { id: "p2", name: "Daniel Kim", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    category: "Data Science", level: "Intermediate", rating: 4.8, reviewCount: 2109, studentsCount: 12100,
    duration: "18h 10m", lessonsCount: 96, price: 59, isPremium: true,
  },
  {
    id: "c3", title: "UI Design Foundations", slug: "ui-design-foundations",
    description: "Master layout, color, and typography to design interfaces people love.",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    publisher: { id: "p3", name: "Lucia Fernandez", avatarUrl: "https://i.pravatar.cc/150?img=47" },
    category: "Design", level: "Beginner", rating: 4.9, reviewCount: 1876, studentsCount: 9800,
    duration: "9h 45m", lessonsCount: 58, price: 0, isPremium: false, progress: 34,
  },
  {
    id: "c4", title: "React Native for iOS & Android", slug: "react-native-cross-platform",
    description: "Ship production mobile apps from a single React Native codebase.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&h=400&fit=crop",
    publisher: { id: "p4", name: "Samuel Otieno", avatarUrl: "https://i.pravatar.cc/150?img=51" },
    category: "Mobile Development", level: "Advanced", rating: 4.7, reviewCount: 984, studentsCount: 5300,
    duration: "21h 00m", lessonsCount: 118, price: 69, isPremium: true,
  },
  {
    id: "c5", title: "TypeScript for JavaScript Developers", slug: "typescript-for-js-devs",
    description: "Add type safety to your projects without slowing your team down.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    publisher: { id: "p1", name: "Amara Okafor", avatarUrl: "https://i.pravatar.cc/150?img=32" },
    category: "Web Development", level: "Beginner", rating: 4.8, reviewCount: 2540, studentsCount: 15600,
    duration: "7h 20m", lessonsCount: 44, price: 0, isPremium: false,
  },
  {
    id: "c6", title: "Applied Deep Learning with PyTorch", slug: "applied-deep-learning-pytorch",
    description: "Computer vision and NLP projects using modern PyTorch workflows.",
    thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    publisher: { id: "p2", name: "Daniel Kim", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    category: "AI & Machine Learning", level: "Advanced", rating: 4.9, reviewCount: 1420, studentsCount: 7600,
    duration: "26h 15m", lessonsCount: 134, price: 79, isPremium: true,
  },
  {
    id: "c7", title: "Git & GitHub Essentials", slug: "git-github-essentials",
    description: "Version control fundamentals every developer needs, from commits to pull requests.",
    thumbnailUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    publisher: { id: "p1", name: "Amara Okafor", avatarUrl: "https://i.pravatar.cc/150?img=32" },
    category: "Web Development", level: "Beginner", rating: 4.8, reviewCount: 3011, studentsCount: 21200,
    duration: "5h 10m", lessonsCount: 32, price: 0, isPremium: false, progress: 100,
  },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Grace Mwangi", role: "Frontend Engineer at Flux", avatarUrl: "https://i.pravatar.cc/150?img=5", quote: "Courverse is the first platform where I actually finish courses. The progress system keeps me honest." },
  { id: "t2", name: "Miguel Santos", role: "Bootcamp Graduate", avatarUrl: "https://i.pravatar.cc/150?img=15", quote: "The course player feels like a real product, not a video wrapped in a sidebar. Genuinely well built." },
  { id: "t3", name: "Priya Nair", role: "Data Analyst at Nomo", avatarUrl: "https://i.pravatar.cc/150?img=25", quote: "I switched from another platform mainly for the UI. Turns out the course quality is better too." },
];

export const curriculum = [
  {
    id: "m1", title: "Getting Started",
    lessons: [
      { id: "l1", title: "Course overview", type: "video", duration: "4:12", completed: true },
      { id: "l2", title: "Setting up your environment", type: "video", duration: "8:45", completed: true },
      { id: "l3", title: "How this course works", type: "reading", duration: "3 min", completed: true },
    ],
  },
  {
    id: "m2", title: "Core Concepts",
    lessons: [
      { id: "l4", title: "Components and props", type: "video", duration: "12:30", completed: true },
      { id: "l5", title: "State and lifecycle", type: "video", duration: "15:10", completed: false },
      { id: "l6", title: "Handling events", type: "video", duration: "9:20", completed: false },
      { id: "l7", title: "Quiz: Core Concepts", type: "quiz", duration: "10 min", completed: false },
    ],
  },
  {
    id: "m3", title: "Building for Production",
    lessons: [
      { id: "l8", title: "Performance patterns", type: "video", duration: "14:05", completed: false },
      { id: "l9", title: "Testing strategy", type: "video", duration: "11:40", completed: false },
      { id: "l10", title: "Deployment", type: "video", duration: "9:55", completed: false },
      { id: "l11", title: "Final challenge", type: "challenge", duration: "30 min", completed: false },
    ],
  },
];

export const currentUser = {
  id: "u1",
  name: "Simon Karanja",
  email: "simon@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=68",
  xp: 1540,
  level: 8,
  streak: 3,
  joinedAt: "March 2025",
  coinBalance: 320,
};

export const dashboardStats = {
  coursesInProgress: 3,
  coursesCompleted: 5,
  totalXp: 1540,
  weeklyGoalLessons: 5,
  weeklyGoalProgress: 3,
  recentActivity: [
    { id: "a1", text: "Completed lesson 'Handling events' in React Masterclass", time: "2h ago" },
    { id: "a2", text: "Earned Gold Badge in UI Design Foundations", time: "1d ago" },
    { id: "a3", text: "Completed Quiz: Core Concepts with 92%", time: "2d ago" },
    { id: "a4", text: "Started TypeScript for JavaScript Developers", time: "4d ago" },
  ],
};

export const rewards = [
  { id: "r1", title: "Gold Badge", description: "Awarded for a 7-day learning streak.", cost: 0, type: "badge", earned: true, icon: "Award" },
  { id: "r2", title: "1 Month Plus Free", description: "Redeem your XP for a free month of Courverse Plus.", cost: 2000, type: "perk", earned: false, icon: "Sparkles" },
  { id: "r3", title: "Early Bird Badge", description: "Complete 3 lessons before 8am, five days in a row.", cost: 0, type: "badge", earned: true, icon: "Sunrise" },
  { id: "r4", title: "Course Voucher ($10)", description: "Redeem for $10 off any premium course.", cost: 1000, type: "voucher", earned: false, icon: "Ticket" },
  { id: "r5", title: "Marathoner Badge", description: "Complete 10 hours of lessons in a single week.", cost: 0, type: "badge", earned: false, icon: "Flame" },
  { id: "r6", title: "Custom Avatar Frame", description: "A gold frame for your profile picture.", cost: 500, type: "cosmetic", earned: false, icon: "CircleDashed" },
];

export const redemptionHistory = [
  { id: "rh1", title: "Course Voucher ($10)", date: "Jun 12, 2026", xpSpent: 1000 },
  { id: "rh2", title: "Custom Avatar Frame", date: "May 2, 2026", xpSpent: 500 },
];

export const certificates = [
  { id: "cert1", courseTitle: "UI Design Foundations", issuedDate: "Jun 28, 2026", publisher: "Lucia Fernandez", credentialId: "CV-88213-UID" },
  { id: "cert2", courseTitle: "Git & GitHub Essentials", issuedDate: "Apr 14, 2026", publisher: "Amara Okafor", credentialId: "CV-40021-GGE" },
];

export const notificationsList = [
  { id: "n1", type: "reward", title: "You earned the Gold Badge!", body: "7-day streak completed. Keep it up.", time: "2h ago", read: false },
  { id: "n2", type: "info", title: "New course from Amara Okafor", body: "Advanced React Patterns just published.", time: "5h ago", read: false },
  { id: "n3", type: "challenge", title: "Daily challenge resets in 3 hours", body: "Complete 3 lessons to keep your streak.", time: "6h ago", read: false },
  { id: "n4", type: "success", title: "Quiz passed: Core Concepts", body: "You scored 92% — nice work.", time: "1d ago", read: true },
  { id: "n5", type: "info", title: "Certificate ready", body: "Your UI Design Foundations certificate is ready to download.", time: "3d ago", read: true },
];
