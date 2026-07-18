import { HelpCircle, TrendingUp, Users } from "lucide-react";
import { publisherQuizzes } from "@/data/publisher-mock";
import { Button } from "@/components/ui/button";

export default function PublisherQuizzesPage() {
  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Quizzes</h1>
          <p className="mt-1 text-text-secondary">Manage quizzes attached to your courses.</p>
        </div>
        <Button>+ New quiz</Button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publisherQuizzes.map((q) => (
          <div key={q.id} className="card-surface p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
              <HelpCircle className="h-5 w-5" />
            </span>
            <p className="mt-4 font-heading font-semibold text-text">{q.title}</p>
            <p className="mt-1 text-sm text-text-secondary">{q.course}</p>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div>
                <p className="font-heading text-sm font-bold text-text">{q.questions}</p>
                <p className="text-[11px] text-text-secondary">Questions</p>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-text">{q.avgScore}%</p>
                <p className="text-[11px] text-text-secondary">Avg score</p>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-text">{q.attempts.toLocaleString()}</p>
                <p className="text-[11px] text-text-secondary">Attempts</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button size="sm" variant="secondary" className="flex-1">Edit</Button>
              <Button size="sm" variant="secondary" className="flex-1">
                <TrendingUp className="h-3.5 w-3.5" /> Results
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card-surface flex items-center gap-3 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-info">
          <Users className="h-4.5 w-4.5" />
        </span>
        <p className="text-sm text-text-secondary">
          Quizzes with an average score below 70% may indicate the preceding lesson needs clarification.
        </p>
      </div>
    </div>
  );
}
