"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { courses } from "@/data/mock";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(["c2", "c4", "c6"]);
  const wishlistCourses = courses.filter((c) => wishlistIds.includes(c.id));

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Wishlist</h1>
      <p className="mt-1 text-text-secondary">{wishlistCourses.length} courses saved for later.</p>

      {wishlistCourses.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <Heart className="mx-auto h-8 w-8 text-text-secondary" />
          <p className="mt-3 font-heading font-semibold text-text">Your wishlist is empty</p>
          <p className="mt-1 text-sm text-text-secondary">Save courses you're interested in to find them here later.</p>
          <Link href="/courses" className="mt-5 inline-block">
            <Button>Browse courses</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {wishlistCourses.map((course) => (
            <div key={course.id} className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Link href={`/courses/${course.id}`} className="relative h-40 w-full shrink-0 overflow-hidden rounded-card sm:h-24 sm:w-40">
                <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
              </Link>
              <div className="flex-1">
                <Link href={`/courses/${course.id}`} className="font-heading font-semibold text-text hover:text-primary">
                  {course.title}
                </Link>
                <p className="mt-1 text-sm text-text-secondary">{course.publisher.name}</p>
                <div className="mt-1.5 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-reward text-reward" />
                  <span className="font-semibold text-text">{course.rating}</span>
                  <span className="text-text-secondary">({course.reviewCount.toLocaleString()})</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-heading font-bold text-text">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </span>
                <Button size="sm">Enroll</Button>
                <button
                  aria-label="Remove from wishlist"
                  onClick={() => setWishlistIds((ids) => ids.filter((id) => id !== course.id))}
                  className="rounded-full p-2 text-error hover:bg-red-50"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
