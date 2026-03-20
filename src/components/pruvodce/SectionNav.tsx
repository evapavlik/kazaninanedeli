"use client";

export type SectionKey = "checklist" | "questions" | "notepad";

interface SectionNavItem {
  key: SectionKey;
  label: string;
  completed: number;
  total: number;
  /** For notepad: show dot indicator instead of count */
  hasContent?: boolean;
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
        const badge =
          section.key === "notepad"
            ? section.hasContent
              ? "\u25CF"
              : "\u25CB"
            : `${section.completed}/${section.total}`;

        return (
          <button
            key={section.key}
            onClick={() => onSelect(section.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-brick text-white"
                : "bg-cream text-text-muted hover:bg-sand/30 hover:text-text"
            }`}
          >
            <span>{section.label}</span>
            <span
              className={`${
                isActive ? "text-white/80" : "text-text-light"
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
