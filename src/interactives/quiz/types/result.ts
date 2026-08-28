export class Result {
  score: number = $state(0);
  totalQuestions: number = $state(0);
  correctAnswers: number = $state(0);
  timeSpent: number = $state(0);
  passed: boolean = $state(false);
  answers: Record<string, any> = $state({});
}
