"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSermonArtifacts } from "@/hooks/useSermonArtifacts";

interface AnnotationItem {
  id: string;
  selectedText: string;
  category: string;
  note: string;
}

interface AnnotationStore {
  textHash: string;
  annotations: AnnotationItem[];
}

interface PreviousStepOutputsProps {
  subStepSlug: string;
}

export default function PreviousStepOutputs({ subStepSlug }: PreviousStepOutputsProps) {
  const [annotations] = useLocalStorage<AnnotationStore | null>("kazani-annotations", null);
  const [fcfData] = useLocalStorage<{ need?: string; intersection?: string } | null>(
    "kazani-fcf-aktualizace",
    null
  );
  const { artifacts } = useSermonArtifacts();

  // Determine what to show based on current sub-step
  // Annotations show on text-working sub-steps AND during sermon composition,
  // so the preacher can draw on their own observations and notes while writing.
  const showAnnotations = ["kontext", "vyklad", "aktualizace", "stavba", "formulace"].includes(
    subStepSlug
  );
  const showCentralIdea = ["aktualizace", "stavba"].includes(subStepSlug);
  const showFCF = subStepSlug === "stavba";
  const showPrednes = subStepSlug === "prednes";

  const allAnnotations: AnnotationItem[] = annotations?.annotations ?? [];
  const keywordAnnotations = allAnnotations.filter((a) => a.category === "keyword");
  const actorAnnotations = allAnnotations.filter((a) => a.category === "actor");
  const tensionAnnotations = allAnnotations.filter((a) => a.category === "tension");
  const questionAnnotations = allAnnotations.filter((a) => a.category === "question");

  const hasAnnotations =
    showAnnotations &&
    (keywordAnnotations.length > 0 ||
      actorAnnotations.length > 0 ||
      tensionAnnotations.length > 0 ||
      questionAnnotations.length > 0);
  const hasCentralIdea = showCentralIdea && artifacts.centralIdea.trim().length > 0;
  const hasFCF = showFCF && fcfData && (fcfData.need || fcfData.intersection);
  const hasPrednes = showPrednes && (artifacts.sermonThesis.trim().length > 0 || artifacts.outlinePoints.trim().length > 0);

  if (!hasAnnotations && !hasCentralIdea && !hasFCF && !hasPrednes) return null;

  return (
    <div className="mb-4 rounded-lg border border-sage/15 bg-sage-pale/30 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-sage">
        {`Z p\u0159edchoz\u00EDch krok\u016F`}
      </p>

      {hasAnnotations && (
        <div className="mb-3 space-y-3">
          <AnnotationGroup
            label="Klíčová slova"
            items={keywordAnnotations}
            pillClass="bg-brick-pale text-brick"
            textClass="text-brick"
            borderClass="border-brick/40 bg-brick/5"
          />
          <AnnotationGroup
            label="Osoby a děje"
            items={actorAnnotations}
            pillClass="bg-sage-pale text-sage"
            textClass="text-sage"
            borderClass="border-sage/40 bg-sage/5"
          />
          <AnnotationGroup
            label="Zlom / napětí"
            items={tensionAnnotations}
            pillClass="bg-sand/30 text-text"
            textClass="text-text"
            borderClass="border-sand/60 bg-sand/10"
          />
          <AnnotationGroup
            label="Otázky"
            items={questionAnnotations}
            pillClass="bg-[#7b5ea7]/10 text-[#7b5ea7]"
            textClass="text-[#7b5ea7]"
            borderClass="border-[#7b5ea7]/40 bg-[#7b5ea7]/5"
          />
        </div>
      )}

      {hasCentralIdea && (
        <div className={hasFCF ? "mb-3" : ""}>
          <p className="mb-1 text-[11px] font-medium text-text-muted">
            {`Centr\u00E1ln\u00ED my\u0161lenka:`}
          </p>
          <p className="text-sm italic text-text">
            {artifacts.centralIdea}
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

      {hasPrednes && (
        <div className="space-y-2">
          {artifacts.sermonThesis.trim().length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium text-text-muted">
                {`J\u00E1dro k\u00E1z\u00E1n\u00ED:`}
              </p>
              <p className="text-sm font-medium italic text-brick">
                {artifacts.sermonThesis}
              </p>
            </div>
          )}
          {artifacts.outlinePoints.trim().length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium text-text-muted">
                {`Osnova:`}
              </p>
              <p className="whitespace-pre-line text-sm text-text">
                {artifacts.outlinePoints}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface AnnotationGroupProps {
  label: string;
  items: AnnotationItem[];
  pillClass: string;
  textClass: string;
  borderClass: string;
}

function AnnotationGroup({
  label,
  items,
  pillClass,
  textClass,
  borderClass,
}: AnnotationGroupProps) {
  if (items.length === 0) return null;

  const withNotes = items.filter((a) => a.note.trim().length > 0);
  const withoutNotes = items.filter((a) => a.note.trim().length === 0);

  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium text-text-muted">{`${label}:`}</p>

      {/* Annotations with notes — shown as cards with the user's comment */}
      {withNotes.length > 0 && (
        <div className="mb-1.5 space-y-1.5">
          {withNotes.map((a) => (
            <div
              key={a.id}
              className={`rounded-md border-l-2 px-2.5 py-1.5 ${borderClass}`}
            >
              <p className={`text-[11px] font-semibold leading-tight ${textClass}`}>
                {`\u201E${a.selectedText}\u201C`}
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
                {a.note}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Annotations without notes — just the pills */}
      {withoutNotes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {withoutNotes.map((a) => (
            <span
              key={a.id}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${pillClass}`}
            >
              {a.selectedText}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
