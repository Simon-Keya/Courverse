"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publisherApi } from "@/api/modules/publisher";
import { useCategories } from "@/hooks/use-courses";
import { toast } from "sonner";

export default function NewCoursePage() {
  const router = useRouter();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    difficulty: "beginner",
    price: "0",
    isFree: true,
    categoryId: "",
    learningOutcomes: "",
    requirements: "",
  });

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    if (form.description.trim().length < 10) {
      toast.error("Please add a fuller description");
      return;
    }
    setLoading(true);
    try {
      const price = form.isFree ? 0 : parseFloat(form.price) || 0;
      const course = await publisherApi.createCourse({
        title: form.title.trim(),
        description: form.description.trim(),
        shortDescription: form.shortDescription.trim() || undefined,
        difficulty: form.difficulty,
        price,
        isFree: form.isFree || price === 0,
        isPremium: price > 0,
        categoryId: form.categoryId || undefined,
        learningOutcomes: form.learningOutcomes
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        requirements: form.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      toast.success("Course created as draft");
      router.push(`/publisher/courses`);
    } catch (err: unknown) {
      toast.error(err?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page max-w-2xl py-8">
      <Link
        href="/publisher/courses"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-text">New course</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Create a draft. You can add curriculum and submit for review later.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-text">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="e.g. React Masterclass"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text">Short description</label>
          <input
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="One-line summary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text">Full description</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="What will students learn?"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-text">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => set("difficulty", e.target.value)}
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all_levels">All levels</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">Select category</option>
              {(categories || []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              checked={form.isFree}
              onChange={(e) => set("isFree", e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary"
            />
            Free course
          </label>
          {!form.isFree && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">$</span>
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-24 rounded-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-text">
            Learning outcomes <span className="text-text-secondary">(one per line)</span>
          </label>
          <textarea
            rows={3}
            value={form.learningOutcomes}
            onChange={(e) => set("learningOutcomes", e.target.value)}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder={"Build production apps\nMaster TypeScript with React"}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text">
            Requirements <span className="text-text-secondary">(one per line)</span>
          </label>
          <textarea
            rows={2}
            value={form.requirements}
            onChange={(e) => set("requirements", e.target.value)}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            placeholder="Basic JavaScript"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating…
              </>
            ) : (
              "Create draft"
            )}
          </Button>
          <Link
            href="/publisher/courses"
            className="inline-flex items-center rounded-btn border border-border px-5 py-2.5 text-sm font-semibold text-text hover:bg-background-secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
