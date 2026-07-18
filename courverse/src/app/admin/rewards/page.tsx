import { Award, Sparkles, Ticket, Flame, Plus } from "lucide-react";
import { adminRewards } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const typeIcons: Record<string, typeof Award> = { badge: Award, perk: Sparkles, voucher: Ticket };

export default function AdminRewardsPage() {
  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Rewards</h1>
          <p className="mt-1 text-text-secondary">Manage the gamification catalog available to learners.</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New reward</Button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {adminRewards.map((r) => {
          const Icon = typeIcons[r.type] ?? Flame;
          return (
            <div key={r.id} className="card-surface p-6">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-reward">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge variant={r.status === "active" ? "primary" : "neutral"} className="capitalize">{r.status}</Badge>
              </div>
              <p className="mt-4 font-heading font-semibold text-text">{r.title}</p>
              <p className="mt-1 text-sm capitalize text-text-secondary">{r.type}</p>
              <p className="mt-4 border-t border-border pt-4 text-sm text-text-secondary">
                Earned <span className="font-semibold text-text">{r.timesEarned.toLocaleString()}</span> times
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
