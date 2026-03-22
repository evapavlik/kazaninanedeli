"use client";

import { useState, useRef, useCallback } from "react";
import { getCategory, type CategoryId } from "@/data/annotation-categories";
import type { PositionedAnnotation } from "@/hooks/useAnnotations";
import SelectionPopup from "./SelectionPopup";
import AnnotationDetail from "./AnnotationDetail";

interface TextSegment {
  text: string;
  annotation: PositionedAnnotation | null;
}

function buildSegments(
  text: string,
  annotations: PositionedAnnotation[]
): TextSegment[] {
  if (annotations.length === 0) {
    return [{ text, annotation: null }];
  }

  const sorted = [...annotations].sort((a, b) => a.startIndex - b.startIndex);
  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const ann of sorted) {
    // Skip invalid annotations
    if (ann.startIndex >= text.length || ann.endIndex > text.length) continue;
    if (ann.startIndex < cursor) continue;

    // Plain text before this annotation
    if (ann.startIndex > cursor) {
      segments.push({
        text: text.slice(cursor, ann.startIndex),
        annotation: null,
      });
    }

    // Annotated segment
    segments.push({
      text: text.slice(ann.startIndex, ann.endIndex),
      annotation: ann,
    });

    cursor = ann.endIndex;
  }

  // Remaining text
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), annotation: null });
  }

  return segments;
}

interface AnnotatedTextDisplayProps {
  text: string;
  annotations: PositionedAnnotation[];
  onAddAnnotation: (
    startIndex: number,
    endIndex: number,
    selectedText: string,
    category: CategoryId
  ) => boolean;
  onRemoveAnnotation: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  className?: string;
}

export default function AnnotatedTextDisplay({
  text,
  annotations,
  onAddAnnotation,
  onRemoveAnnotation,
  onUpdateNote,
  className = "",
}: AnnotatedTextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Selection popup state
  const [selectionPopup, setSelectionPopup] = useState<{
    x: number;
    y: number;
    startIndex: number;
    endIndex: number;
    selectedText: string;
  } | null>(null);

  // Margin note editing
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Annotation detail popover state
  const [detailPopover, setDetailPopover] = useState<{
    x: number;
    y: number;
    annotation: PositionedAnnotation;
  } | null>(null);

  // Calculate character offset within the container's text content
  const getTextOffset = useCallback(
    (node: Node, offset: number): number | null => {
      if (!containerRef.current) return null;

      const walker = document.createTreeWalker(
        containerRef.current,
        NodeFilter.SHOW_TEXT
      );

      let charCount = 0;
      let current = walker.nextNode();
      while (current) {
        if (current === node) {
          return charCount + offset;
        }
        charCount += (current.textContent?.length ?? 0);
        current = walker.nextNode();
      }
      return null;
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    // Close any open detail popover
    setDetailPopover(null);

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setSelectionPopup(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();
    if (!selectedText) {
      setSelectionPopup(null);
      return;
    }

    // Check if selection is within our container
    if (
      !containerRef.current?.contains(range.startContainer) ||
      !containerRef.current?.contains(range.endContainer)
    ) {
      setSelectionPopup(null);
      return;
    }

    const startOffset = getTextOffset(range.startContainer, range.startOffset);
    const endOffset = getTextOffset(range.endContainer, range.endOffset);

    if (startOffset === null || endOffset === null) {
      setSelectionPopup(null);
      return;
    }

    const rect = range.getBoundingClientRect();

    setSelectionPopup({
      x: rect.left + rect.width / 2 - 100,
      y: rect.top,
      startIndex: Math.min(startOffset, endOffset),
      endIndex: Math.max(startOffset, endOffset),
      selectedText,
    });
  }, [getTextOffset]);

  const handleCategorySelect = useCallback(
    (category: CategoryId) => {
      if (!selectionPopup) return;

      onAddAnnotation(
        selectionPopup.startIndex,
        selectionPopup.endIndex,
        selectionPopup.selectedText,
        category
      );

      setSelectionPopup(null);
      window.getSelection()?.removeAllRanges();
    },
    [selectionPopup, onAddAnnotation]
  );

  const handleAnnotationClick = useCallback(
    (e: React.MouseEvent, annotation: PositionedAnnotation) => {
      e.stopPropagation();
      setSelectionPopup(null);

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDetailPopover({
        x: rect.left,
        y: rect.bottom,
        annotation,
      });
    },
    []
  );

  const segments = buildSegments(text, annotations);

  // Margin notes: only show when there are annotations
  const sortedAnnotations = [...annotations].sort(
    (a, b) => a.startIndex - b.startIndex
  );
  const hasMarginNotes = sortedAnnotations.length > 0;

  return (
    <>
      <div className={`grid grid-cols-1 gap-3 ${
        hasMarginNotes ? "lg:grid-cols-[1fr_minmax(160px,35%)]" : ""
      }`}>
        {/* Text column */}
        <div
          ref={containerRef}
          onMouseUp={handleMouseUp}
          className={`select-text cursor-text ${className}`}
        >
          {segments.map((seg, i) => {
            if (seg.annotation) {
              const cat = getCategory(seg.annotation.category);
              return (
                <mark
                  key={`${seg.annotation.id}-${i}`}
                  onClick={(e) => handleAnnotationClick(e, seg.annotation!)}
                  className={`cursor-pointer rounded-sm px-0.5 ${cat.markBg} transition-all hover:ring-1 hover:ring-current ${cat.color}`}
                  title={`${cat.name}${seg.annotation.note ? `: ${seg.annotation.note}` : ""}`}
                >
                  {seg.text}
                </mark>
              );
            }
            return <span key={i}>{seg.text}</span>;
          })}
        </div>

        {/* Margin notes column — desktop only */}
        {hasMarginNotes && (
          <div className="hidden lg:block space-y-2 pt-1">
            {sortedAnnotations.map((ann) => {
              const cat = getCategory(ann.category);
              const isEditing = editingNoteId === ann.id;
              const snippet =
                ann.selectedText.length > 30
                  ? ann.selectedText.slice(0, 30) + "\u2026"
                  : ann.selectedText;

              return (
                <div
                  key={ann.id}
                  className={`rounded-md border-l-2 px-2.5 py-1.5 transition-all cursor-pointer hover:shadow-sm ${
                    cat.id === "keyword"
                      ? "border-brick/40 bg-brick/5"
                      : cat.id === "actor"
                        ? "border-sage/40 bg-sage/5"
                        : cat.id === "tension"
                          ? "border-sand/60 bg-sand/10"
                          : "border-[#7b5ea7]/40 bg-[#7b5ea7]/5"
                  }`}
                  onClick={() => setEditingNoteId(isEditing ? null : ann.id)}
                >
                  {/* Snippet from text */}
                  <p className={`text-[10px] font-medium leading-tight ${cat.color}`}>
                    {`\u201E${snippet}\u201C`}
                  </p>

                  {/* Note or placeholder */}
                  {isEditing ? (
                    <textarea
                      autoFocus
                      defaultValue={ann.note}
                      onChange={(e) => onUpdateNote(ann.id, e.target.value)}
                      onBlur={() => setEditingNoteId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingNoteId(null);
                      }}
                      placeholder={`Pozn\u00E1mka\u2026`}
                      rows={2}
                      className="mt-1 w-full rounded border border-border/50 bg-white px-1.5 py-1 text-[11px] leading-relaxed text-text placeholder:text-text-light/40 focus:border-sage focus:outline-none resize-y"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : ann.note ? (
                    <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
                      {ann.note}
                    </p>
                  ) : (
                    <p className="mt-0.5 text-[10px] italic text-text-light/50">
                      {`+ p\u0159idat pozn\u00E1mku`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selection popup */}
      {selectionPopup && (
        <SelectionPopup
          position={{ x: selectionPopup.x, y: selectionPopup.y }}
          onSelect={handleCategorySelect}
          onClose={() => setSelectionPopup(null)}
        />
      )}

      {/* Annotation detail popover */}
      {detailPopover && (
        <AnnotationDetail
          annotationId={detailPopover.annotation.id}
          selectedText={detailPopover.annotation.selectedText}
          category={detailPopover.annotation.category}
          note={detailPopover.annotation.note}
          position={{ x: detailPopover.x, y: detailPopover.y }}
          onUpdateNote={onUpdateNote}
          onRemove={onRemoveAnnotation}
          onClose={() => setDetailPopover(null)}
        />
      )}
    </>
  );
}
