"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/client";
import { coursesApi } from "@/api/modules/courses";
import { toast } from "sonner";

export default function CurriculumEditorPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolved =
    typeof (params as any).then === "function"
      ? use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const courseId = resolved.id;
  const qc = useQueryClient();
  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonForms, setLessonForms] = useState<Record<string, { title: string; type: string }>>({});

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => coursesApi.getById(courseId),
  });

  const addSection = useMutation({
    mutationFn: (title: string) =>
      apiClient.post(`/courses/${courseId}/sections`, { title }).then((r) => r.data),
    onSuccess: () => {
      toast.success("Section added");
      setSectionTitle("");
      qc.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const addLesson = useMutation({
    mutationFn: ({ sectionId, title, type }: { sectionId: string; title: string; type: string }) =>
      apiClient
        .post(`/sections/${sectionId}/lessons`, { title, type, durationMinutes: 10 })
        .then((r) => r.data),
    onSuccess: (_d, vars) => {
      toast.success("Lesson added");
      setLessonForms((f) => ({ ...f, [vars.sectionId]: { title: "", type: "video" } }));
      qc.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const deleteSection = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/sections/${id}`),
    onSuccess: () => {
      toast.success("Section removed");
      qc.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });

  const deleteLesson = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/lessons/${id}`),
    onSuccess: () => {
      toast.success("Lesson removed");
      qc.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const sections = course?.sections || [];

  return (
    <div className="container-page max-w-3xl py-8">
      <Link
        href="/publisher/courses"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-text">Curriculum</h1>
      <p className="mt-1 text-sm text-text-secondary">{course?.title}</p>

      <div className="mt-8 space-y-6">
        {sections.map((section: any) => (
          <div key={section.id} className="rounded-card border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-text">{section.title}</h2>
              <button
                onClick={() => deleteSection.mutate(section.id)}
                className="rounded-btn p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600"
                aria-label="Delete section"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {(section.lessons || []).map((lesson: any) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between rounded-input border border-border px-3 py-2 text-sm"
                >
                  <span>
                    <span className="text-text-secondary capitalize">{lesson.type}</span>
                    {" · "}
                    {lesson.title}
                  </span>
                  <button
                    onClick={() => deleteLesson.mutate(lesson.id)}
                    className="text-text-secondary hover:text-red-600"
                    aria-label="Delete lesson"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                placeholder="Lesson title"
                value={lessonForms[section.id]?.title || ""}
                onChange={(e) =>
                  setLessonForms((f) => ({
                    ...f,
                    [section.id]: {
                      title: e.target.value,
                      type: f[section.id]?.type || "video",
                    },
                  }))
                }
                className="flex-1 rounded-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <select
                value={lessonForms[section.id]?.type || "video"}
                onChange={(e) =>
                  setLessonForms((f) => ({
                    ...f,
                    [section.id]: {
                      title: f[section.id]?.title || "",
                      type: e.target.value,
                    },
                  }))
                }
                className="rounded-input border border-border px-2 py-2 text-sm"
              >
                <option value="video">Video</option>
                <option value="reading">Reading</option>
                <option value="quiz">Quiz</option>
                <option value="challenge">Challenge</option>
              </select>
              <Button
                size="sm"
                disabled={!lessonForms[section.id]?.title || addLesson.isPending}
                onClick={() =>
                  addLesson.mutate({
                    sectionId: section.id,
                    title: lessonForms[section.id].title,
                    type: lessonForms[section.id].type || "video",
                  })
                }
              >
                <Plus className="h-3.5 w-3.5" /> Add lesson
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 rounded-card border border-dashed border-border p-4">
        <input
          placeholder="New section title"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          className="flex-1 rounded-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <Button
          disabled={!sectionTitle.trim() || addSection.isPending}
          onClick={() => addSection.mutate(sectionTitle.trim())}
        >
          {addSection.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add section
        </Button>
      </div>
    </div>
  );
}
