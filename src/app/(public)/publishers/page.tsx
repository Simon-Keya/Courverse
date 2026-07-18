import Image from "next/image";
import Link from "next/link";
import { Star, Users, BookOpen } from "lucide-react";
import { publishers } from "@/data/mock";

export default function PublishersPage() {
  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">Publishers</h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Meet the practitioners and educators building courses on Courverse.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishers.map((pub) => (
            <Link key={pub.id} href={`/publishers/${pub.id}`} className="card-surface p-6">
              <div className="flex items-center gap-4">
                <Image src={pub.avatarUrl} alt={pub.name} width={56} height={56} className="rounded-full" />
                <div>
                  <p className="font-heading font-semibold text-text">{pub.name}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-reward text-reward" />
                    <span className="font-medium text-text">{pub.rating}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm text-text-secondary">{pub.bio}</p>

              <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> {pub.coursesCount} courses
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {pub.studentsCount.toLocaleString()} students
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
