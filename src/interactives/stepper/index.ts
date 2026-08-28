import Root from "./root.svelte";
import Content from "./stepper-content.svelte";
import Controls from "./stepper-controls.svelte";
import Indicators from "./stepper-indicators.svelte";
import Navigation from "./stepper-navigation.svelte";

export type * from "./types";

export const Stepper = {
  Root,
  Navigation,
  Content,
  Controls,
  Indicators
};
