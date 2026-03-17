"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ChecklistProps {
  slug: string;
  items: string[];
}

export default function Checklist({ slug, items }: ChecklistProps) {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    `kazani-checklist-${slug}`,
    new Array(items.length).fill(false)
  );

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const completedCount = checked.filter(Boolean).length;

  const reset = () => {
    setChecked(new Array(items.length).fill(false));
  };

  return (
    <section className="mb-8 rounded-xl border border-border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-lora text-lg font-bold text-text">
          {`Praktick\u00E9 kroky`}
        </h2>
        <span className="text-xs text-text-muted">
          {completedCount}/{items.length} hotovo
        </span>
      </div>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full gap-3 text-left group items-start"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  checked[i]
                    ? "bg-brick text-white"
                    : "bg-brick-pale text-brick group-hover:bg-brick/20"
                }`}
              >
                {checked[i] ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7l3 3 5-6" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{i + 1}</span>
                )}
              </span>
              <span
                className={`text-sm leading-relaxed transition-all duration-200 ${
                  checked[i] ? "text-text-muted line-through" : "text-text"
                }`}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ol>
      {completedCount > 0 && (
        <button
          onClick={reset}
          className="mt-4 text-xs text-text-muted transition-colors hover:text-brick"
        >
          Resetovat
        </button>
      )}
    </section>
  );
}
