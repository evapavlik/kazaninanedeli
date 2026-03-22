"use client";

import { useState } from "react";
import Link from "next/link";
import { useSermonArtifacts } from "@/hooks/useSermonArtifacts";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function SermonPreview() {
  const { artifacts, updateField } = useSermonArtifacts();
  const [bibleRef] = useLocalStorage<string>("kazani-bible-ref", "");
  const [editing, setEditing] = useState<string | null>(null);

  const hasContent = !!(
    artifacts.centralIdea ||
    artifacts.sermonThesis ||
    artifacts.outlinePoints ||
    artifacts.intro ||
    artifacts.conclusion
  );

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="mb-4 text-4xl">{"\uD83D\uDCDD"}</span>
        <h1 className="font-lora text-xl font-bold text-text">
          {`Va\u0161e k\u00E1z\u00E1n\u00ED se teprve rod\u00ED`}
        </h1>
        <p className="mt-2 max-w-md text-sm text-text-muted">
          {`Projd\u011Bte pr\u016Fvodcem a vypl\u0148te kl\u00ED\u010Dov\u00E1 pole \u2014 centr\u00E1ln\u00ED my\u0161lenku, osnovu, \u00FAvod a z\u00E1v\u011Br. V\u0161e se zobraz\u00ED zde.`}
        </p>
        <Link
          href="/pruvodce/text"
          className="mt-6 rounded-lg bg-brick px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:bg-brick-light"
        >
          {`Za\u010D\u00EDt p\u0159\u00EDpravu`}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
          {`N\u00E1hled k\u00E1z\u00E1n\u00ED`}
        </p>
        {bibleRef && (
          <h1 className="mt-1 font-lora text-2xl font-bold text-text">
            {bibleRef}
          </h1>
        )}
        <p className="mt-2 text-xs text-text-muted">
          {`V\u0161e, co jste p\u0159ipravili \u2014 na jednom m\u00EDst\u011B. Klikn\u011Bte na libovoln\u00E9 pole pro \u00FApravu.`}
        </p>
      </div>

      {/* Central idea */}
      {artifacts.centralIdea && (
        <Section
          icon={"\uD83C\uDFAF"}
          label={`Centr\u00E1ln\u00ED my\u0161lenka textu`}
          value={artifacts.centralIdea}
          field="centralIdea"
          editing={editing}
          onEdit={setEditing}
          onSave={updateField}
          highlight
        />
      )}

      {/* Sermon thesis */}
      <Section
        icon={"\uD83D\uDCA1"}
        label={`Hlavn\u00ED my\u0161lenka k\u00E1z\u00E1n\u00ED`}
        value={artifacts.sermonThesis}
        field="sermonThesis"
        editing={editing}
        onEdit={setEditing}
        onSave={updateField}
        highlight
        placeholder={`Formulujte hlavn\u00ED my\u0161lenku k\u00E1z\u00E1n\u00ED jednou v\u011Btou...`}
      />

      {/* Listeners */}
      {(artifacts.listenerSituation || artifacts.textListenerBridge) && (
        <div className="mt-6 rounded-xl border border-sage/15 bg-sage-pale/20 p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
            {`\uD83E\uDDED Propojen\u00ED s poslucha\u010Di`}
          </p>
          {artifacts.listenerSituation && (
            <Section
              label={`Situace poslucha\u010D\u016F`}
              value={artifacts.listenerSituation}
              field="listenerSituation"
              editing={editing}
              onEdit={setEditing}
              onSave={updateField}
              compact
            />
          )}
          {artifacts.textListenerBridge && (
            <Section
              label={`Most text \u2014 \u017Eivot`}
              value={artifacts.textListenerBridge}
              field="textListenerBridge"
              editing={editing}
              onEdit={setEditing}
              onSave={updateField}
              compact
            />
          )}
          {artifacts.takeaway && (
            <Section
              label={`Co si odn\u00E9st`}
              value={artifacts.takeaway}
              field="takeaway"
              editing={editing}
              onEdit={setEditing}
              onSave={updateField}
              compact
            />
          )}
        </div>
      )}

      {/* Intro */}
      <Section
        icon={"\uD83D\uDEAA"}
        label={`\u00DAvod`}
        value={artifacts.intro}
        field="intro"
        editing={editing}
        onEdit={setEditing}
        onSave={updateField}
        placeholder={`Jak vt\u00E1hnete poslucha\u010De?`}
      />

      {/* Outline */}
      <Section
        icon={"\uD83D\uDCCB"}
        label={`Osnova`}
        value={artifacts.outlinePoints}
        field="outlinePoints"
        editing={editing}
        onEdit={setEditing}
        onSave={updateField}
        multiline
        placeholder={`1. Prvn\u00ED bod\n2. Druh\u00FD bod\n3. T\u0159et\u00ED bod`}
      />

      {/* Illustrations */}
      {artifacts.illustrations && (
        <Section
          icon={"\uD83C\uDF1F"}
          label={`Ilustrace a p\u0159\u00EDb\u011Bhy`}
          value={artifacts.illustrations}
          field="illustrations"
          editing={editing}
          onEdit={setEditing}
          onSave={updateField}
          multiline
        />
      )}

      {/* Conclusion */}
      <Section
        icon={"\uD83C\uDFC1"}
        label={`Z\u00E1v\u011Br`}
        value={artifacts.conclusion}
        field="conclusion"
        editing={editing}
        onEdit={setEditing}
        onSave={updateField}
        placeholder={`Jak shrnete a po\u0161lete d\u00E1l?`}
      />

      {/* Personal context */}
      {(artifacts.personalSituation || artifacts.expectations || artifacts.overallImpression) && (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-cream/50 p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`\uD83D\uDD6F\uFE0F Osobn\u00ED kontext`}
          </p>
          {artifacts.personalSituation && (
            <p className="text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`Situace: `}</span>
              {artifacts.personalSituation}
            </p>
          )}
          {artifacts.expectations && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`O\u010Dek\u00E1v\u00E1n\u00ED: `}</span>
              {artifacts.expectations}
            </p>
          )}
          {artifacts.overallImpression && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`Dojem z textu: `}</span>
              {artifacts.overallImpression}
            </p>
          )}
        </div>
      )}

      {/* Historical/liturgical context */}
      {(artifacts.author || artifacts.historicalContext || artifacts.liturgicalConnection) && (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-cream/50 p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`\uD83D\uDDFA\uFE0F Kontext textu`}
          </p>
          {artifacts.author && (
            <p className="text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`Autor: `}</span>
              {artifacts.author}
            </p>
          )}
          {artifacts.historicalContext && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`Historick\u00E9 pozad\u00ED: `}</span>
              {artifacts.historicalContext}
            </p>
          )}
          {artifacts.liturgicalConnection && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">{`Liturgick\u00FD kontext: `}</span>
              {artifacts.liturgicalConnection}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex items-center justify-center gap-4 border-t border-border pt-6">
        <Link
          href="/pruvodce/prednes"
          className="rounded-lg bg-brick px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:bg-brick-light"
        >
          {`Pokra\u010Dovat k p\u0159ednesu \u2192`}
        </Link>
        <Link
          href="/pruvodce/text"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted no-underline transition-all hover:border-brick/30 hover:text-brick"
        >
          {`Zp\u011Bt k p\u0159\u00EDprav\u011B`}
        </Link>
      </div>
    </div>
  );
}

/** Editable section */
function Section({
  icon,
  label,
  value,
  field,
  editing,
  onEdit,
  onSave,
  highlight,
  compact,
  multiline,
  placeholder,
}: {
  icon?: string;
  label: string;
  value: string;
  field: string;
  editing: string | null;
  onEdit: (field: string | null) => void;
  onSave: (field: keyof import("@/hooks/useSermonArtifacts").SermonArtifacts, value: string) => void;
  highlight?: boolean;
  compact?: boolean;
  multiline?: boolean;
  placeholder?: string;
}) {
  const isEditing = editing === field;

  if (isEditing) {
    return (
      <div className={compact ? "mt-2" : "mt-6"}>
        {!compact && icon && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`${icon} ${label}`}
          </p>
        )}
        {compact && (
          <p className="mb-1 text-[10px] text-text-light">{label}</p>
        )}
        <textarea
          autoFocus
          defaultValue={value}
          rows={multiline ? 5 : 2}
          className="w-full rounded-lg border border-brick/20 bg-white px-3 py-2 text-[13px] leading-relaxed text-text focus:border-brick/40 focus:outline-none focus:ring-2 focus:ring-brick/10 resize-y"
          onBlur={(e) => {
            onSave(field as keyof import("@/hooks/useSermonArtifacts").SermonArtifacts, e.target.value);
            onEdit(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onEdit(null);
            }
          }}
        />
      </div>
    );
  }

  // Empty state
  if (!value && placeholder) {
    return (
      <div className={compact ? "mt-2" : "mt-6"}>
        <button
          onClick={() => onEdit(field)}
          className="w-full rounded-lg border border-dashed border-border bg-cream/30 px-4 py-3 text-left transition-all hover:border-brick/30 hover:bg-brick-pale/20"
        >
          {!compact && icon && (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
              {`${icon} ${label}`}
            </p>
          )}
          <p className="text-[12px] italic text-text-light/60">{placeholder}</p>
        </button>
      </div>
    );
  }

  if (!value) return null;

  // Display state
  return (
    <div className={compact ? "mt-2" : "mt-6"}>
      <button
        onClick={() => onEdit(field)}
        className={`w-full rounded-lg px-4 py-3 text-left transition-all hover:bg-cream/60 ${
          highlight
            ? "border border-brick/10 bg-brick-pale/20"
            : compact
              ? ""
              : "border border-border/50 bg-white"
        }`}
      >
        {!compact && icon && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`${icon} ${label}`}
          </p>
        )}
        {compact && (
          <p className="mb-0.5 text-[10px] text-text-light">{label}</p>
        )}
        {multiline ? (
          <div className={`text-[13px] leading-relaxed ${highlight ? "font-medium text-text" : "text-text-muted"} whitespace-pre-line`}>
            {value}
          </div>
        ) : (
          <p className={`text-[13px] leading-relaxed ${highlight ? "font-medium text-text" : "text-text-muted"}`}>
            {value}
          </p>
        )}
      </button>
    </div>
  );
}
