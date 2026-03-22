export type FlowItem =
  | { type: "check"; text: string }
  | { type: "reflect"; text: string }
  | { type: "artifact"; text: string; field: string; placeholder?: string };

export interface SubStep {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  estimatedMinutes: number;
  description: string;
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
  flow: FlowItem[];
  tip: string;
}

/** @deprecated Use Phase + SubStep instead */
export interface Step {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  estimatedMinutes: number;
  description: string;
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
  practicalSteps: string[];
  questions: string[];
  tip: string;
}

export interface Phase {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  estimatedMinutes: number;
  description: string;
  subSteps: SubStep[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  related?: string[];
}

export interface Resource {
  title: string;
  author: string;
  description: string;
  type: "kniha" | "web" | "clanek";
  url?: string;
}

export interface ExampleStep {
  stepNumber: number;
  stepSlug: string;
  checkedItems: boolean[];
  notes: string;
  questionAnswers: string[];
  commentary: string;
}

export interface WorkedExample {
  title: string;
  bibleReference: string;
  bibleText: string;
  introduction: string;
  steps: ExampleStep[];
}
