import { ScrollText, Bot, User } from "lucide-react";
import { adminLogs } from "@/data/admin-mock";

export default function AdminLogsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Logs</h1>
      <p className="mt-1 text-text-secondary">System and admin activity audit trail.</p>

      <div className="mt-6 card-surface divide-y divide-border">
        {adminLogs.map((log) => (
          <div key={log.id} className="flex items-start gap-4 px-6 py-4">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              log.actor === "system" ? "bg-blue-50 text-info" : "bg-primary-light text-primary"
            }`}>
              {log.actor === "system" ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
            </span>
            <div className="flex-1">
              <p className="text-sm text-text">{log.action}</p>
              <p className="mt-1 text-xs text-text-secondary">
                {log.actor === "system" ? "System" : log.actor} · {log.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-text-secondary">
        <ScrollText className="h-3.5 w-3.5" /> Logs are retained for 90 days.
      </div>
    </div>
  );
}
