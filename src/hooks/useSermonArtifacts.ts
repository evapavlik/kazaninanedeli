"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * All artifacts produced during sermon preparation.
 * Each field maps to a specific step output.
 * Connected workflow: each step reads from previous steps and writes to its own fields.
 */
export interface SermonArtifacts {
  // Phase 1: P\u0159\u00EDprava srdce
  personalSituation: string; // "Co m\u011B tr\u00E1p\u00ED/t\u011B\u0161\u00ED"
  expectations: string; // "S jak\u00FDmi ot\u00E1zkami p\u0159ich\u00E1z\u00EDm"

  // Phase 2 \u2014 \u010Cten\u00ED
  overallImpression: string; // Celkov\u00FD dojem po prvn\u00EDm \u010Dten\u00ED
  // (keywords come from annotations in localStorage "kazani-annotations")

  // Phase 2 \u2014 Kontext
  author: string; // Kdo napsal a komu
  historicalContext: string; // Historick\u00E9 pozad\u00ED
  liturgicalConnection: string; // Souvislost s liturgick\u00FDm obdob\u00EDm

  // Phase 2 \u2014 V\u00FDklad
  centralIdea: string; // Centr\u00E1ln\u00ED my\u0161lenka jednou v\u011Btou

  // Phase 3 \u2014 Aktualizace
  listenerSituation: string; // Co pro\u017E\u00EDvaj\u00ED poslucha\u010Di
  textListenerBridge: string; // Pr\u016Fse\u010D\u00EDk textu a \u017Eivota
  illustrations: string; // Konkr\u00E9tn\u00ED p\u0159\u00EDb\u011Bhy/ilustrace
  takeaway: string; // Co si maj\u00ED odn\u00E9st

  // Phase 3 \u2014 Stavba
  sermonThesis: string; // Hlavn\u00ED my\u0161lenka k\u00E1z\u00E1n\u00ED (m\u016F\u017Ee se li\u0161it od centralIdea)
  outlinePoints: string; // Hlavn\u00ED body osnovy
  intro: string; // \u00DAvod k\u00E1z\u00E1n\u00ED
  conclusion: string; // Z\u00E1v\u011Br k\u00E1z\u00E1n\u00ED

  // Phase 3 \u2014 Formulace
  sermonText: string; // Cel\u00FD text k\u00E1z\u00E1n\u00ED
}

const EMPTY_ARTIFACTS: SermonArtifacts = {
  personalSituation: "",
  expectations: "",
  overallImpression: "",
  author: "",
  historicalContext: "",
  liturgicalConnection: "",
  centralIdea: "",
  listenerSituation: "",
  textListenerBridge: "",
  illustrations: "",
  takeaway: "",
  sermonThesis: "",
  outlinePoints: "",
  intro: "",
  conclusion: "",
  sermonText: "",
};

const STORAGE_KEY = "kazani-artifacts";

export function useSermonArtifacts() {
  const [artifacts, setArtifacts] = useLocalStorage<SermonArtifacts>(
    STORAGE_KEY,
    EMPTY_ARTIFACTS
  );

  const updateField = useCallback(
    (field: keyof SermonArtifacts, value: string) => {
      setArtifacts((prev) => ({ ...prev, [field]: value }));
    },
    [setArtifacts]
  );

  const resetAll = useCallback(() => {
    setArtifacts(EMPTY_ARTIFACTS);
  }, [setArtifacts]);

  /**
   * Get summary of what has been produced so far.
   * Used by BuildingBlocks card to show context from previous steps.
   */
  const getStepContext = useCallback(
    (forStep: string) => {
      switch (forStep) {
        case "kontext":
          // Show keywords from annotations + overall impression
          return {
            items: [
              artifacts.overallImpression && {
                label: `Celkov\u00FD dojem`,
                value: artifacts.overallImpression,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        case "vyklad":
          return {
            items: [
              artifacts.overallImpression && {
                label: `Celkov\u00FD dojem`,
                value: artifacts.overallImpression,
              },
              artifacts.author && {
                label: `Autor a adres\u00E1t`,
                value: artifacts.author,
              },
              artifacts.historicalContext && {
                label: `Historick\u00E9 pozad\u00ED`,
                value: artifacts.historicalContext,
              },
              artifacts.liturgicalConnection && {
                label: `Liturgick\u00FD kontext`,
                value: artifacts.liturgicalConnection,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        case "aktualizace":
          return {
            items: [
              artifacts.centralIdea && {
                label: `Centr\u00E1ln\u00ED my\u0161lenka`,
                value: artifacts.centralIdea,
                highlight: true,
              },
              artifacts.overallImpression && {
                label: `Celkov\u00FD dojem`,
                value: artifacts.overallImpression,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        case "stavba":
          return {
            items: [
              artifacts.centralIdea && {
                label: `Centr\u00E1ln\u00ED my\u0161lenka`,
                value: artifacts.centralIdea,
                highlight: true,
              },
              artifacts.listenerSituation && {
                label: `Poslucha\u010Di`,
                value: artifacts.listenerSituation,
              },
              artifacts.textListenerBridge && {
                label: `Most text\u2013\u017Eivot`,
                value: artifacts.textListenerBridge,
              },
              artifacts.illustrations && {
                label: `Ilustrace`,
                value: artifacts.illustrations,
              },
              artifacts.takeaway && {
                label: `Co si odn\u00E9st`,
                value: artifacts.takeaway,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        case "formulace":
          return {
            items: [
              artifacts.sermonThesis && {
                label: `J\u00E1dro k\u00E1z\u00E1n\u00ED`,
                value: artifacts.sermonThesis,
                highlight: true,
              },
              artifacts.outlinePoints && {
                label: `Osnova`,
                value: artifacts.outlinePoints,
              },
              artifacts.intro && {
                label: `\u00DAvod`,
                value: artifacts.intro,
              },
              artifacts.conclusion && {
                label: `Z\u00E1v\u011Br`,
                value: artifacts.conclusion,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        case "prednes":
          return {
            items: [
              artifacts.sermonThesis && {
                label: `J\u00E1dro k\u00E1z\u00E1n\u00ED`,
                value: artifacts.sermonThesis,
                highlight: true,
              },
              artifacts.outlinePoints && {
                label: `Osnova`,
                value: artifacts.outlinePoints,
              },
              artifacts.intro && {
                label: `\u00DAvod`,
                value: artifacts.intro,
              },
              artifacts.conclusion && {
                label: `Z\u00E1v\u011Br`,
                value: artifacts.conclusion,
              },
            ].filter((x): x is { label: string; value: string; highlight?: boolean } => !!x),
          };
        default:
          return { items: [] };
      }
    },
    [artifacts]
  );

  return { artifacts, updateField, resetAll, getStepContext };
}
