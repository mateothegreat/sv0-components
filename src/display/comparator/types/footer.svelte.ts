import { Row } from "./row.svelte";
import type { Class, FooterEvent, FooterRenderer, Value } from "./types";

export class Footer {
  id?: string;
  class?: Class;
  sticky? = $state(false);
  value?: Value;
  renderer? = $state<FooterRenderer>();
  rows = $state<Row[]>();
  onclick?: (e: FooterEvent) => void;

  constructor(v: Partial<Footer>) {
    this.id = v.id;
    this.class = v.class;
    this.sticky = v.sticky ?? false;
    this.value = v.value;
    this.renderer = v.renderer;
    this.rows = $state(v.rows?.map((r) => new Row(r)) ?? []);
    this.onclick = v.onclick;
  }
}
