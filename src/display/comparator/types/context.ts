import { Size } from "@sv0/components/common/types";
import { Footer } from "./footer.svelte";
import { Header } from "./header.svelte";
import { Section } from "./section.svelte";
import { State } from "./state";

export class Context {
  id?: string;
  state? = $state<State>(State.VISIBLE);
  size?: Size;
  header? = $state<Header>();
  sections = $state<Section[]>([]);
  footer? = $state<Footer>();
  onclick? = $state<(event: Event) => void>();

  constructor(v: Partial<Context>) {
    this.id = v.id;
    this.state = v.state ?? State.VISIBLE;
    this.size = v.size || Size.MEDIUM;
    this.header = v.header ? new Header(v.header) : undefined;
    this.sections = v.sections?.map((s) => new Section(s)) ?? [];
    this.onclick = v.onclick;
  }
}
