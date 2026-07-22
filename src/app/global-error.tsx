"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary — only fires when the root layout itself throws,
 * so it renders its own document and cannot rely on the app's fonts or CSS.
 * Kept deliberately plain and reassuring.
 */
export default function GlobalError({
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
    <html lang="cs">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f5",
          color: "#1f1a16",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            {"Něco se pokazilo"}
          </h1>
          <p style={{ color: "#6b6259", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {"Vaše práce zůstává uložená ve vašem prohlížeči. Zkuste stránku načíst znovu."}
          </p>
          <button
            onClick={reset}
            style={{
              background: "#c41e1e",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {"Zkusit znovu"}
          </button>
        </div>
      </body>
    </html>
  );
}
