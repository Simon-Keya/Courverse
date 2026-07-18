import Link from "next/link";
import { Flame, Star, Trophy, BookOpen, TrendingUp, Award, ArrowRight } from "lucide-react";
import { courses, currentUser, dashboardStats, rewards } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";

export default function DashboardPage() {
  const inProgress = courses.filter((c) => typeof c.progress === "number");
  const recommended = courses.filter((c) => typeof c.progress !== "number").slice(0, 3);
  const earnedRewards = rewards.filter((r) => r.earned);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Hello {currentUser.name.split(" ")[0]} 👋</h1>
      <p className="mt-1 text-text-secondary">Here's where you left off.</p>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-challenge">
            <Flame className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{currentUser.streak} days</p>
          <p className="text-xs text-text-secondary">Current streak</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-reward">
            <Trophy className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{currentUser.xp.toLocaleString()} XP</p>
          <p className="text-xs text-text-secondary">Total earned</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{dashboardStats.coursesInProgress}</p>
          <p className="text-xs text-text-secondary">Courses in progress</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-info">
            <TrendingUp className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{dashboardStats.coursesCompleted}</p>
          <p className="text-xs text-text-secondary">Courses completed</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          {/* Continue learning */}
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Continue Learning</h2>
            <Link href="/my-learning" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {inProgress.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Recommended */}
          <div className="mt-10 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Recommended for you</h2>
            <Link href="/courses" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Weekly goal */}
          <div className="card-surface p-6">
            <p className="font-heading font-semibold text-text">Today's Goal</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-challenge">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">{dashboardStats.weeklyGoalProgress} of {dashboardStats.weeklyGoalLessons} lessons</p>
                <p className="text-xs text-text-secondary">Keep your streak alive</p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background-secondary">
              <div
                className="h-full rounded-full bg-progress-gradient"
                style={{ width: `${(dashboardStats.weeklyGoalProgress / dashboardStats.weeklyGoalLessons) * 100}%` }}
              />
            </div>
          </div>

          {/* Rewards summary */}
          <div className="card-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-heading font-semibold text-text">Rewards</p>
              <Link href="/rewards" className="text-xs font-semibold text-primary hover:text-primary-hover">View all</Link>
            </div>
            <div className="mt-4 space-y-3">
              {earnedRewards.slice(0, 2).map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-card bg-yellow-50 p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-reward">
                    <Award className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">{r.title}</p>
                    <p className="text-xs text-text-secondary">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card-surface p-6">
            <p className="font-heading font-semibold text-text">Recent activity</p>
            <ul className="mt-4 space-y-4">
              {dashboardStats.recentActivity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm text-text">{a.text}</p>
                    <p className="text-xs text-text-secondary">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
