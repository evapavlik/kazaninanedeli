"use client";

import { useEffect, useState } from "react";

interface StepCardWithProgressProps {
  slug: string;
  totalItems: number;
  children: React.ReactNode;
}

export default function StepCardWithProgress({
  slug,
  totalItems,
  children,
}: StepCardWithProgressProps) {
  const [completedCount, setCompletedCount] = useState(0);
  const [hasNotes, setHasNotes] = useState(false);

  useEffect(() => {
    try {
      // Read checklist state
      const checklistData = window.localStorage.getItem(
        `kazani-checklist-${slug}`
      );
      if (checklistData) {
        const checked: boolean[] = JSON.parse(checklistData);
        setCompletedCount(checked.filter(Boolean).length);
      }

      // Check if notes exist
      const notesData = window.localStorage.getItem(`kazani-notes-${slug}`);
      if (notesData) {
        const notes = JSON.parse(notesData);
        setHasNotes(typeof notes === "string" && notes.trim().length > 0);
      }
    } catch {
      // localStorage unavailable or corrupted — silently ignore
    }
  }, [slug]);

  const isComplete = completedCount === totalItems && totalItems > 0;
  const isStarted = completedCount > 0 || hasNotes;
  const progressPercent =
    totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  return (
    <div className="relative">
      {children}

      {/* Progress indicator */}
      {isStarted && (
        <>
          {/* Progress bar at bottom of card */}
          <div className="absolute bottom-0 left-4 right-4 h-1 overflow-hidden rounded-b-xl bg-brick/10">
            <div
              className="h-full rounded-full bg-brick transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Badge */}
          <div className="absolute -top-2 -right-2">
            {isComplete ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brick text-white shadow-sm">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6l3 3 5-6" />
                </svg>
              </span>
            ) : (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brick/10 px-1.5 text-[10px] font-bold text-brick">
                {completedCount}/{totalItems}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
