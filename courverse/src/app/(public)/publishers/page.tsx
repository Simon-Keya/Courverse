import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  BookOpen,
  Star,
  Users,
  ArrowRight,
  Award,
  BadgeCheck,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Publishers | Courverse",
  description:
    "Discover world-class instructors, institutions and organizations publishing courses on Courverse.",
};

const publishers = [
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/images/publishers/microsoft.png",
    description:
      "Professional cloud, AI, Azure and software engineering programs.",
    courses: 143,
    students: "320K+",
    rating: 4.9,
    verified: true,
    featured: true,
    categories: ["Cloud", "AI", "Azure"],
  },
  {
    id: "google",
    name: "Google",
    logo: "/images/publishers/google.png",
    description:
      "Industry-recognized certificates in technology, UX, data and marketing.",
    courses: 89,
    students: "415K+",
    rating: 4.8,
    verified: true,
    featured: true,
    categories: ["Data", "UX", "Cloud"],
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: "/images/publishers/aws.png",
    description:
      "Cloud architecture, DevOps and security certifications.",
    courses: 102,
    students: "250K+",
    rating: 4.8,
    verified: true,
    featured: false,
    categories: ["Cloud", "DevOps"],
  },
  {
    id: "courverse",
    name: "Courverse Originals",
    logo: "/images/logo.png",
    description:
      "Exclusive project-based learning created by Courverse experts.",
    courses: 65,
    students: "180K+",
    rating: 4.9,
    verified: true,
    featured: false,
    categories: ["Projects", "Career"],
  },
];

export default function PublishersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b">
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <span className="inline-flex rounded-full border px-4 py-1 text-sm font-medium">
              Trusted Learning Partners
            </span>

            <h1 className="text-5xl font-black tracking-tight lg:text-6xl">
              Learn from the world's best publishers
            </h1>

            <p className="text-lg text-muted-foreground">
              Every publisher on Courverse is carefully reviewed to ensure
              exceptional learning quality, real-world expertise and measurable
              career outcomes.
            </p>

            <div className="mx-auto flex max-w-xl gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  placeholder="Search publishers..."
                  className="pl-11"
                />
              </div>

              <Button size="lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Featured Publishers
            </h2>

            <p className="mt-2 text-muted-foreground">
              Industry leaders delivering premium education.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {publishers
            .filter((publisher) => publisher.featured)
            .map((publisher) => (
              <Card
                key={publisher.id}
                className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border bg-muted">
                      <Image
                        src={publisher.logo}
                        alt={publisher.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                          {publisher.name}
                        </h3>

                        {publisher.verified && (
                          <BadgeCheck className="size-5 text-primary" />
                        )}
                      </div>

                      <p className="mt-3 text-muted-foreground">
                        {publisher.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          {publisher.courses} Courses
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="size-4" />
                          {publisher.students}
                        </div>

                        <div className="flex items-center gap-2">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          {publisher.rating}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {publisher.categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Link href={`/publishers/${publisher.id}`}>
                          <Button>
                            View Publisher

                            <ArrowRight className="ml-2 size-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {publishers.map((publisher) => (
            <Card
              key={publisher.id}
              className="transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="space-y-5 p-6">
                <div className="relative h-16 w-16 rounded-lg border">
                  <Image
                    src={publisher.logo}
                    alt={publisher.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {publisher.name}
                  </h3>

                  {publisher.verified && (
                    <BadgeCheck className="size-4 text-primary" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {publisher.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Courses</span>
                    <strong>{publisher.courses}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Students</span>
                    <strong>{publisher.students}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Rating</span>
                    <strong>{publisher.rating}</strong>
                  </div>
                </div>

                <Link href={`/publishers/${publisher.id}`}>
                  <Button className="w-full">
                    Explore Publisher
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Award className="mx-auto mb-6 size-14 text-primary" />

            <h2 className="text-4xl font-bold">
              Become a Courverse Publisher
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Share your expertise with learners worldwide, grow your audience,
              and build sustainable educational revenue.
            </p>

            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg">
                  Apply as Publisher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}