import Link from "next/link";
import { GraduationCap, Flame, Trophy, Award } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold text-text">Courverse</span>
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">{children}</div>

        <p className="text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} Courverse. All rights reserved.
        </p>
      </div>

      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-background-secondary lg:flex lg:flex-col lg:items-center lg:justify-center lg:border-l lg:border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#DCFCE7,_transparent_55%)]" />
        <div className="relative w-full max-w-sm px-8">
          <div className="card-surface p-6">
            <p className="text-sm text-text-secondary">Hello Simon 👋</p>
            <p className="mt-1 font-heading text-lg font-semibold text-text">Continue Learning</p>
            <div className="mt-4">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-background-secondary">
                <div className="h-full w-[72%] rounded-full bg-progress-gradient" />
              </div>
              <p className="mt-1.5 text-xs font-semibold text-primary">72% complete</p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-card border border-border bg-orange-50 p-3 text-center">
                <Flame className="mx-auto h-5 w-5 text-challenge" />
                <p className="mt-1 text-xs font-semibold text-text">3 Lessons</p>
                <p className="text-[10px] text-text-secondary">Today's goal</p>
              </div>
              <div className="rounded-card border border-border bg-yellow-50 p-3 text-center">
                <Trophy className="mx-auto h-5 w-5 text-reward" />
                <p className="mt-1 text-xs font-semibold text-text">1,540 XP</p>
                <p className="text-[10px] text-text-secondary">Total earned</p>
              </div>
              <div className="rounded-card border border-border bg-primary-light p-3 text-center">
                <Award className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-xs font-semibold text-text">Gold badge</p>
                <p className="text-[10px] text-text-secondary">Latest reward</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center font-heading text-xl font-semibold text-text">
            Learn skills that actually stick.
          </p>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Join 240K+ learners tracking real progress, one lesson at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
