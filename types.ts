
export interface BilingualText {
  vi: string;
  en: string;
}

export interface Step {
  vi: string;
  en: string;
}

export interface Exercise {
  id: string;
  title: BilingualText;
  steps: Step[];
  icon: string;
}
