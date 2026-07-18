import Image from "next/image";
import Link from "next/link";
import { Camera, Trophy, Flame, BookOpen, Award } from "lucide-react";
import { currentUser, dashboardStats, certificates } from "@/data/mock";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Profile</h1>
      <div className="mt-4"><ProfileTabs /></div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="card-surface p-6 text-center">
          <div className="relative mx-auto w-fit">
            <Image src={currentUser.avatarUrl} alt={currentUser.name} width={96} height={96} className="rounded-full" />
            <button aria-label="Change avatar" className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 font-heading text-lg font-semibold text-text">{currentUser.name}</p>
          <p className="text-sm text-text-secondary">{currentUser.email}</p>
          <p className="mt-1 text-xs text-text-secondary">Learning since {currentUser.joinedAt}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-card bg-background-secondary p-3">
              <Trophy className="h-4 w-4 text-reward" />
              <p className="mt-1.5 text-sm font-semibold text-text">{currentUser.xp.toLocaleString()} XP</p>
              <p className="text-xs text-text-secondary">Level {currentUser.level}</p>
            </div>
            <div className="rounded-card bg-background-secondary p-3">
              <Flame className="h-4 w-4 text-challenge" />
              <p className="mt-1.5 text-sm font-semibold text-text">{currentUser.streak} days</p>
              <p className="text-xs text-text-secondary">Current streak</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Learning statistics */}
          <div className="card-surface p-6">
            <p className="font-heading font-semibold text-text">Learning statistics</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-heading text-xl font-bold text-text">{dashboardStats.coursesInProgress}</p>
                <p className="text-xs text-text-secondary">In progress</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-text">{dashboardStats.coursesCompleted}</p>
                <p className="text-xs text-text-secondary">Completed</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-text">{certificates.length}</p>
                <p className="text-xs text-text-secondary">Certificates</p>
              </div>
            </div>
          </div>

          {/* Certificates preview */}
          <div className="card-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-heading font-semibold text-text">Certificates earned</p>
              <Link href="/certificates" className="text-xs font-semibold text-primary hover:text-primary-hover">View all</Link>
            </div>
            <div className="mt-4 space-y-3">
              {certificates.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-reward">
                    <Award className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text">{c.courseTitle}</p>
                    <p className="text-xs text-text-secondary">Issued {c.issuedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface flex items-center gap-3 p-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <BookOpen className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm text-text-secondary">
              Update your details and password from the <Link href="/profile/settings" className="font-semibold text-primary hover:text-primary-hover">Settings</Link> tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
