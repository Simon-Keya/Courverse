// src/app/(public)/courses/page.tsx
import { Search, Filter } from 'lucide-react';
import { CourseCard } from '@/components/course/cards/CourseCard';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">All Courses</h1>
            <p className="text-slate-600 mt-2">Discover world-class learning experiences</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500"
              />
            </div>
            <Button variant="outline" className="px-6">
              <Filter className="mr-2 w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Dynamic cards will go here */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CourseCard key={i} course={null as any} />
          ))}
        </div>
      </div>
    </div>
  );
}