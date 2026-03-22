export interface AnnotationCategory {
  id: "keyword" | "actor" | "tension" | "question";
  name: string;
  color: string;
  bg: string;
  markBg: string;
}

export type CategoryId = AnnotationCategory["id"];

export const annotationCategories: AnnotationCategory[] = [
  {
    id: "keyword",
    name: "Kl\u00ED\u010Dov\u00E9 slovo",
    color: "text-brick",
    bg: "bg-brick/10",
    markBg: "bg-brick/20",
  },
  {
    id: "actor",
    name: "Osoby a d\u011Bje",
    color: "text-sage",
    bg: "bg-sage/10",
    markBg: "bg-sage/20",
  },
  {
    id: "tension",
    name: "Zlom / nap\u011Bt\u00ED",
    color: "text-text",
    bg: "bg-sand/30",
    markBg: "bg-sand/40",
  },
  {
    id: "question",
    name: "Ot\u00E1zka",
    color: "text-[#7b5ea7]",
    bg: "bg-[#7b5ea7]/10",
    markBg: "bg-[#7b5ea7]/20",
  },
];

export function getCategory(id: string): AnnotationCategory {
  return annotationCategories.find((c) => c.id === id) ?? annotationCategories[0];
}
