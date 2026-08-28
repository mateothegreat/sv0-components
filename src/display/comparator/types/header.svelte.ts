import { Cell } from "./cell.svelte";
import type { Class, HeaderEvent, HeaderRenderer, Value } from "./types";

export class Header {
  id?: string;
  class?: Class;
  sticky? = $state(false);
  value?: Value;
  renderer? = $state<HeaderRenderer>();
  cells = $state<Cell[]>();
  onclick?: (e: HeaderEvent) => void;

  constructor(v: Partial<Header>) {
    this.id = v.id;
    this.class = v.class;
    this.sticky = v.sticky ?? false;
    this.value = v.value;
    this.renderer = v.renderer;
    this.cells = v.cells?.map((c) => new Cell(c)) ?? [];
    this.onclick = v.onclick;
  }
}
