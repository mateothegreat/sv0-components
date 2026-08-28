import type { CellEvent, CellRenderer, Class, Value } from "./types";

export class Cell {
  id?: string;
  class?: Class;
  value?: Value;
  renderer?: CellRenderer;
  onclick?: (e: CellEvent) => void;

  constructor(v: Partial<Cell>) {
    this.id = v.id;
    this.class = v.class;
    this.value = v.value;
    this.renderer = v.renderer;
    this.onclick = v.onclick;
  }
}
