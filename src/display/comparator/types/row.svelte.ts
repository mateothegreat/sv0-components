import { Cell } from "./cell.svelte";
import type { RowEvent, RowRenderer, Value } from "./types";

export class Row {
  id?: string;
  value?: Value;
  renderer?: RowRenderer;
  cells = $state<Cell[]>();
  onclick?: (e: RowEvent) => void;

  constructor(v: Partial<Row>) {
    this.id = v.id;
    this.value = v.value;
    this.renderer = v.renderer;
    this.cells = v.cells?.map((c) => new Cell(c)) ?? [];
    this.onclick = v.onclick;
  }
}
