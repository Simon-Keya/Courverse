"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Heart } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/course/CourseCard";
import { wishlistApi } from "@/api/modules/wishlist";
import { normalizeCourse } from "@/types/course";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export default function WishlistPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistApi.list(),
    enabled: isAuthenticated,
    retry: 1,
  });

  const removeMutation = useMutation({
    mutationFn: (courseId: string) => wishlistApi.remove(courseId),
    onSuccess: () => {
      toast.success("Removed from wishlist");
      qc.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="container-page py-16 text-center">
        <Heart className="mx-auto h-12 w-12 text-text-secondary" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-text">Wishlist</h1>
        <p className="mt-2 text-text-secondary">Log in to save courses.</p>
        <Link href="/login" className="mt-6 inline-block text-primary hover:underline">
          Log in
        </Link>
      </div>
    );
  }

  const courses =
    data?.map((item) =>
      item.course
        ? normalizeCourse(item.course)
        : normalizeCourse({ id: item.courseId, title: "Course", description: "", price: 0, rating: 0, publisher: { id: "", name: "—" } }),
    ) || [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Wishlist</h1>
      <p className="mt-1 text-text-secondary">
        {isLoading ? "Loading…" : `${courses.length} saved courses.`}
      </p>

      {isLoading ? (
        <div className="mt-16 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : courses.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">Wishlist is empty</p>
          <p className="mt-1 text-sm text-text-secondary">
            Save courses you want to take later.
          </p>
          <Link href="/courses" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="relative">
              <CourseCard course={course} />
              <button
                onClick={() => removeMutation.mutate(course.id)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
                aria-label="Remove from wishlist"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
