export interface Step {
  id: number | string;
  title: string;
  subtitle?: string;
  description?: string[];
  image?: string;
  imageAlt?: string;
}

export interface StepperProps {
  steps: Step[];
  activeStep?: number;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  pauseOnHover?: boolean;
  class?: string;
  onStepChange?: (step: number) => void;
}

export interface StepContentSnippet {
  step: Step;
  index: number;
  isActive: boolean;
}
