import Controls from "./controls.svelte";
import Evaluator from "./evaluator.svelte";
import Header from "./header.svelte";
import Option from "./option.svelte";
import Progress from "./progress.svelte";
import Question from "./question.svelte";
import Results from "./results.svelte";
import Review from "./review.svelte";
import Root from "./root.svelte";
import Timer from "./timer.svelte";

import * as Types from "./types";

export const Quiz = {
  Root,
  Controls,
  Evaluator,
  Header,
  Option,
  Progress,
  Question,
  Review,
  Timer,
  Results
};

export type { Types };
