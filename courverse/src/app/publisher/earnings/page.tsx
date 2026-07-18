import { Wallet, Download, CreditCard } from "lucide-react";
import { publisherStats, publisherEarningsHistory, publisherPayouts, publisherProfile } from "@/data/publisher-mock";
import { BarChart } from "@/components/charts/BarChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PublisherEarningsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Earnings</h1>
      <p className="mt-1 text-text-secondary">Track your revenue and payout history.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card-surface p-6">
          <p className="text-sm text-text-secondary">Total earned</p>
          <p className="mt-1 font-heading text-2xl font-bold text-text">${publisherStats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-text-secondary">This month</p>
          <p className="mt-1 font-heading text-2xl font-bold text-primary">${publisherStats.revenueThisMonth.toLocaleString()}</p>
        </div>
        <div className="card-surface flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-text-secondary">Payout method</p>
            <p className="mt-1 text-sm font-semibold text-text">{publisherProfile.payoutMethod}</p>
          </div>
          <CreditCard className="h-6 w-6 text-text-secondary" />
        </div>
      </div>

      <div className="mt-6 card-surface p-6">
        <p className="font-heading font-semibold text-text">Revenue by month</p>
        <div className="mt-6">
          <BarChart data={publisherEarningsHistory.map((e) => ({ label: e.month, value: e.amount }))} valueFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} barColorClassName="bg-reward" />
        </div>
      </div>

      <div className="mt-6 card-surface overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="font-heading font-semibold text-text">Payout history</p>
          <Button variant="secondary" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
        </div>
        <div className="divide-y divide-border">
          {publisherPayouts.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-reward">
                  <Wallet className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-text">${p.amount.toLocaleString()}</p>
                  <p className="text-xs text-text-secondary">{p.date}</p>
                </div>
              </div>
              <Badge variant="primary" className="capitalize">{p.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
