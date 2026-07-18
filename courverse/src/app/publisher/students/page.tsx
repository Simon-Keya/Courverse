import Image from "next/image";
import { publisherStudents } from "@/data/publisher-mock";

export default function PublisherStudentsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Students</h1>
      <p className="mt-1 text-text-secondary">{publisherStudents.length} learners across your courses.</p>

      <div className="mt-6 card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-6 py-3 font-medium">Course</th>
              <th className="px-6 py-3 font-medium">Progress</th>
              <th className="px-6 py-3 font-medium">Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {publisherStudents.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={s.avatarUrl} alt={s.name} width={32} height={32} className="rounded-full" />
                    <span className="font-medium text-text">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{s.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-background-secondary">
                      <div className="h-full rounded-full bg-progress-gradient" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-primary">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{s.enrolledDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
