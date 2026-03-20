export interface Step {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  estimatedMinutes: number;
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
  practicalSteps: string[];
  questions: string[];
  tip: string;
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
