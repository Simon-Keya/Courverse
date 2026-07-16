// src/app/(public)/courses/[id]/page.tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-6">
              Beginner • 8 weeks
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Complete React Mastery 2026
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Master modern React with hooks, Next.js, TypeScript, and real-world projects.
            </p>

            <div className="flex items-center gap-8 text-sm mb-10">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" /> 4.98
              </div>
              <div className="flex items-center gap-2">
                <Users /> 3,284 students
              </div>
              <div className="flex items-center gap-2">
                <Clock /> 42 hours
              </div>
            </div>

            <Button size="lg" className="bg-white text-emerald-700 hover:bg-slate-100 text-lg px-10 py-7 rounded-2xl">
              Enroll Now - $89
              <ArrowRight className="ml-3" />
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://picsum.photos/id/1015/800/500"
              alt="Course"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* More sections would go here (Curriculum, Reviews, etc.) */}
    </div>
  );
}