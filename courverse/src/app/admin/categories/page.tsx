"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { adminCategories } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminCategoriesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Categories</h1>
          <p className="mt-1 text-text-secondary">{adminCategories.length} categories powering course discovery.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" /> New category
        </Button>
      </div>

      {showForm && (
        <form
          className="card-surface mt-6 grid gap-4 p-6 sm:grid-cols-[1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            setShowForm(false);
          }}
        >
          <input
            required
            type="text"
            placeholder="Category name"
            className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
          <Button type="submit">Create</Button>
        </form>
      )}

      <div className="mt-6 card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Courses</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {adminCategories.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4 font-medium text-text">{c.name}</td>
                <td className="px-6 py-4 text-text-secondary">{c.courseCount}</td>
                <td className="px-6 py-4">
                  <Badge variant="primary" className="capitalize">{c.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <button aria-label="Edit category" className="rounded-btn p-1.5 text-text-secondary hover:bg-background-secondary">
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
