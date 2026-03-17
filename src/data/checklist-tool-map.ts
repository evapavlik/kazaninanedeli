/**
 * Mapping: which checklist item (by step slug + index) gets an inline tool helper.
 * The componentKey is resolved in StepContentPanel to the actual React component.
 */
export interface ToolMapping {
  itemIndex: number;
  label: string;
  icon: string;
  componentKey: string;
}

export const checklistToolMap: Record<string, ToolMapping[]> = {
  cteni: [
    {
      itemIndex: 2,
      label: `Typ textu`,
      icon: "\uD83D\uDD0D",
      componentKey: "NarrativeTypeIdentifier",
    },
  ],
  kontext: [
    {
      itemIndex: 1,
      label: `Kontext knihy`,
      icon: "\uD83D\uDCD6",
      componentKey: "BibleBookContext",
    },
    {
      itemIndex: 3,
      label: `Liturgick\u00FD kalend\u00E1\u0159`,
      icon: "\uD83D\uDCC5",
      componentKey: "LiturgicalCalendar",
    },
  ],
  vyklad: [],
  aktualizace: [
    {
      itemIndex: 0,
      label: `FCF \u2014 lidsk\u00E1 pot\u0159eba`,
      icon: "\uD83D\uDCA1",
      componentKey: "FCFHelper",
    },
    {
      itemIndex: 2,
      label: `Role v p\u0159\u00EDb\u011Bhu`,
      icon: "\uD83C\uDFAD",
      componentKey: "RoleIdentifier",
    },
  ],
  stavba: [
    {
      itemIndex: 2,
      label: `Osnova k\u00E1z\u00E1n\u00ED`,
      icon: "\uD83D\uDDD2\uFE0F",
      componentKey: "OutlineBuilder",
    },
  ],
};
