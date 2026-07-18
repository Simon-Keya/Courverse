import { Award, Sparkles, Sunrise, Ticket, Flame, CircleDashed, Coins, History } from "lucide-react";
import { currentUser, rewards, redemptionHistory } from "@/data/mock";
import { Button } from "@/components/ui/button";

const icons: Record<string, typeof Award> = { Award, Sparkles, Sunrise, Ticket, Flame, CircleDashed };

export default function RewardsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Rewards</h1>
      <p className="mt-1 text-text-secondary">Earn XP by learning, then redeem it for perks and badges.</p>

      {/* Points balance */}
      <div className="mt-6 card-surface flex flex-col items-center gap-3 bg-primary-light p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-reward">
            <Coins className="h-7 w-7" />
          </span>
          <div>
            <p className="font-heading text-3xl font-bold text-text">{currentUser.xp.toLocaleString()} XP</p>
            <p className="text-sm text-primary-hover">Level {currentUser.level} · {currentUser.coinBalance} coins available</p>
          </div>
        </div>
        <Button variant="secondary">View XP history</Button>
      </div>

      {/* Available rewards */}
      <h2 className="mt-10 font-heading text-lg font-bold text-text">Available rewards</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((r) => {
          const Icon = icons[r.icon] ?? Award;
          return (
            <div key={r.id} className="card-surface flex flex-col p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-reward">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-heading font-semibold text-text">{r.title}</p>
              <p className="mt-1 flex-1 text-sm text-text-secondary">{r.description}</p>

              <div className="mt-5 flex items-center justify-between">
                {r.earned ? (
                  <span className="badge-pill bg-primary-light text-primary-hover">Earned</span>
                ) : (
                  <span className="text-sm font-semibold text-text">{r.cost.toLocaleString()} XP</span>
                )}
                {!r.earned && (
                  <Button size="sm" variant="secondary" disabled={currentUser.xp < r.cost}>
                    Redeem
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption history */}
      <h2 className="mt-10 flex items-center gap-2 font-heading text-lg font-bold text-text">
        <History className="h-5 w-5 text-text-secondary" /> Redemption history
      </h2>
      <div className="mt-4 card-surface divide-y divide-border">
        {redemptionHistory.map((h) => (
          <div key={h.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-medium text-text">{h.title}</p>
              <p className="text-xs text-text-secondary">{h.date}</p>
            </div>
            <span className="text-sm font-semibold text-text-secondary">-{h.xpSpent.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
