import { Header } from "./header.svelte";
import { Row } from "./row.svelte";
import type { Class, SectionEvent, SectionRenderer, Value } from "./types";

export class Section {
  id?: string;
  class?: Class;
  collapsible = $state(false);
  value?: Value;
  renderer?: SectionRenderer;
  header = $state<Header>();
  rows = $state<Row[]>();
  onclick?: (e: SectionEvent) => void;

  constructor(v: Partial<Section>) {
    this.id = v.id;
    this.class = v.class;
    this.collapsible = v.collapsible ?? false;
    this.value = v.value;
    this.renderer = v.renderer;
    this.rows = v.rows?.map((r) => new Row(r)) ?? [];
    this.onclick = v.onclick;
  }
}
