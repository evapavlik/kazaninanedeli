"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Keeps a crash in one client panel from turning
 * the whole page white, and reassures the preacher that their work is safe —
 * everything is kept in the browser, nothing was lost.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brick-pale text-3xl">
          {"🥺"}
        </span>
        <h1 className="mb-3 font-lora text-2xl font-bold text-text">
          {"Něco se pokazilo"}
        </h1>
        <p className="mb-2 text-[15px] leading-relaxed text-text-muted">
          {"Omlouváme se — tuhle stránku se nepodařilo načíst. "}
          {"Vaše práce je v bezpečí, zůstává uložená ve vašem prohlížeči."}
        </p>
        <p className="mb-7 text-[13px] leading-relaxed text-text-light">
          {"Zkuste to prosím znovu — většinou to stačí."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-brick px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
          >
            {"Zkusit znovu"}
          </button>
          <Link
            href="/"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
          >
            {"Zpět na úvod"}
          </Link>
        </div>
      </div>
    </div>
  );
}
