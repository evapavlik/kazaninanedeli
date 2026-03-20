"use client";

export type SectionKey = "checklist" | "questions" | "notepad";

interface SectionNavItem {
  key: SectionKey;
  label: string;
  completed: number;
  total: number;
  /** For notepad: show dot indicator instead of count */
  hasContent?: boolean;
  /** For questions: locked until checklist is done */
  locked?: boolean;
}

interface SectionNavProps {
  sections: SectionNavItem[];
  activeSection: SectionKey;
  onSelect: (key: SectionKey) => void;
}

export default function SectionNav({
  sections,
  activeSection,
  onSelect,
}: SectionNavProps) {
  return (
    <div className="mb-4 flex gap-2">
      {sections.map((section) => {
        const isActive = activeSection === section.key;
        const isLocked = section.locked;
        const badge =
          section.key === "notepad"
            ? section.hasContent
              ? "\u25CF"
              : "\u25CB"
            : isLocked
              ? "\uD83D\uDD12"
              : `${section.completed}/${section.total}`;

        return (
          <button
            key={section.key}
            onClick={() => !isLocked && onSelect(section.key)}
            disabled={isLocked}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              isLocked
                ? "cursor-not-allowed bg-cream/50 text-text-light/50"
                : isActive
                  ? "bg-brick text-white"
                  : "bg-cream text-text-muted hover:bg-sand/30 hover:text-text"
            }`}
          >
            <span>{section.label}</span>
            <span
              className={`${
                isLocked
                  ? "text-text-light/40"
                  : isActive
                    ? "text-white/80"
                    : "text-text-light"
              }`}
            >
              {badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
