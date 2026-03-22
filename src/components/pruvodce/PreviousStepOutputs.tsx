"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AnnotationStore {
  textHash: string;
  annotations: Array<{
    id: string;
    selectedText: string;
    category: string;
    note: string;
  }>;
}

interface PreviousStepOutputsProps {
  subStepSlug: string;
}

export default function PreviousStepOutputs({ subStepSlug }: PreviousStepOutputsProps) {
  const [annotations] = useLocalStorage<AnnotationStore | null>("kazani-annotations", null);
  const [centralIdea] = useLocalStorage<string>("kazani-central-idea", "");
  const [fcfData] = useLocalStorage<{ need?: string; intersection?: string } | null>(
    "kazani-fcf-aktualizace",
    null
  );

  // Determine what to show based on current sub-step
  const showAnnotations = ["kontext", "vyklad"].includes(subStepSlug);
  const showCentralIdea = ["aktualizace", "stavba"].includes(subStepSlug);
  const showFCF = subStepSlug === "stavba";

  // Get keyword annotations
  const keywords = annotations?.annotations
    ?.filter((a) => a.category === "keyword")
    ?.map((a) => a.selectedText) || [];
  const actors = annotations?.annotations
    ?.filter((a) => a.category === "actor")
    ?.map((a) => a.selectedText) || [];

  const hasAnnotations = showAnnotations && (keywords.length > 0 || actors.length > 0);
  const hasCentralIdea = showCentralIdea && centralIdea.trim().length > 0;
  const hasFCF = showFCF && fcfData && (fcfData.need || fcfData.intersection);

  if (!hasAnnotations && !hasCentralIdea && !hasFCF) return null;

  return (
    <div className="mb-4 rounded-lg border border-sage/15 bg-sage-pale/30 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-sage">
        {`Z p\u0159edchoz\u00EDch krok\u016F`}
      </p>

      {hasAnnotations && (
        <div className="mb-3">
          {keywords.length > 0 && (
            <div className="mb-2">
              <p className="mb-1 text-[11px] font-medium text-text-muted">
                {`Kl\u00ED\u010Dov\u00E1 slova:`}
              </p>
              <div className="flex flex-wrap gap-1">
                {keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-brick-pale px-2 py-0.5 text-[11px] font-medium text-brick"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
          {actors.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium text-text-muted">
                {`Osoby a d\u011Bje:`}
              </p>
              <div className="flex flex-wrap gap-1">
                {actors.map((m, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-sage-pale px-2 py-0.5 text-[11px] font-medium text-sage"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {hasCentralIdea && (
        <div className={hasFCF ? "mb-3" : ""}>
          <p className="mb-1 text-[11px] font-medium text-text-muted">
            {`Centr\u00E1ln\u00ED my\u0161lenka:`}
          </p>
          <p className="text-sm italic text-text">
            {centralIdea}
          </p>
        </div>
      )}

      {hasFCF && (
        <div>
          {fcfData?.need && (
            <div className="mb-1">
              <p className="text-[11px] font-medium text-text-muted">
                {`Lidsk\u00E1 pot\u0159eba (FCF):`}
              </p>
              <p className="text-sm text-text">{fcfData.need}</p>
            </div>
          )}
          {fcfData?.intersection && (
            <div>
              <p className="text-[11px] font-medium text-text-muted">
                {`Pr\u016Fse\u010D\u00EDk s poslucha\u010Di:`}
              </p>
              <p className="text-sm text-text">{fcfData.intersection}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
