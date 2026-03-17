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

  return (
    <>
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
