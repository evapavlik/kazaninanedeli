/**
 * Mapping: which flow item (by sub-step slug + index) gets an inline tool helper.
 * The componentKey is resolved in StepContentPanel to the actual React component.
 * Indices reference the flow[] array in phases.ts.
 */
export interface ToolMapping {
  itemIndex: number;
  label: string;
  icon: string;
  componentKey?: string;
  /** Open a tool bubble on the workspace instead of inline component */
  openToolKey?: string;
  openToolNumber?: number;
}

export const checklistToolMap: Record<string, ToolMapping[]> = {
  cteni: [
    {
      itemIndex: 1,
      label: `Typ textu`,
      icon: "\uD83D\uDD0D",
      componentKey: "NarrativeTypeIdentifier",
    },
    {
      itemIndex: 2,
      label: `Porovnat p\u0159eklady`,
      icon: "\uD83D\uDD04",
      openToolKey: "translations",
      openToolNumber: 1,
    },
  ],
  kontext: [
    {
      itemIndex: 0,
      label: `Kontext knihy`,
      icon: "\uD83D\uDCD6",
      openToolKey: "bookContext",
      openToolNumber: 2,
    },
    {
      itemIndex: 1,
      label: `V\u00FDkladov\u00E9 koment\u00E1\u0159e`,
      icon: "\uD83D\uDCDA",
      openToolKey: "commentary",
      openToolNumber: 5,
    },
    {
      itemIndex: 4,
      label: `Liturgick\u00FD kalend\u00E1\u0159`,
      icon: "\uD83D\uDCC5",
      openToolKey: "liturgy",
      openToolNumber: 3,
    },
  ],
  vyklad: [
    {
      itemIndex: 0,
      label: `P\u016Fvodn\u00ED jazyky`,
      icon: "\u03B1",
      openToolKey: "originals",
      openToolNumber: 4,
    },
    {
      itemIndex: 1,
      label: `Porovnat p\u0159eklady`,
      icon: "\uD83D\uDD04",
      openToolKey: "translations",
      openToolNumber: 1,
    },
    {
      itemIndex: 2,
      label: `V\u00FDkladov\u00E9 koment\u00E1\u0159e`,
      icon: "\uD83D\uDCDA",
      openToolKey: "commentary",
      openToolNumber: 5,
    },
  ],
  aktualizace: [
    {
      itemIndex: 0,
      label: `FCF \u2014 lidsk\u00E1 pot\u0159eba`,
      icon: "\uD83D\uDCA1",
      componentKey: "FCFHelper",
    },
    {
      itemIndex: 3,
      label: `Role v p\u0159\u00EDb\u011Bhu`,
      icon: "\uD83C\uDFAD",
      componentKey: "RoleIdentifier",
    },
  ],
  stavba: [
    {
      itemIndex: 4,
      label: `Osnova k\u00E1z\u00E1n\u00ED`,
      icon: "\uD83D\uDDD2\uFE0F",
      componentKey: "OutlineBuilder",
    },
  ],
};
