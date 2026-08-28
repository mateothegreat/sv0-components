export type DragDropState<T = unknown> = {
  dragging: boolean;
  overhead: boolean;
  data?: T;
};

export interface DragDropCallbacks<T = unknown> {
  /**
   * Called when drag starts.
   */
  start?: (state: DragDropState<T>, e: DragEvent) => void;

  /**
   * Called when dragging ends.
   */
  end?: (state: DragDropState<T>, e: DragEvent) => void;

  /**
   * Called when something is dragged over the element.
   */
  over?: (state: DragDropState<T>, e: DragEvent) => void;

  /**
   * Called when dragged item enters the element.
   */
  enter?: (state: DragDropState<T>, e: DragEvent) => void;

  /**
   * Called when dragged item leaves the element.
   */
  leave?: (state: DragDropState<T>, e: DragEvent) => void;

  /**
   * Called when something is dropped on the element.
   */
  drop?: (state: DragDropState<T>, e: DragEvent) => void;
}

export type options = {
  /**
   * Whether the element can be dragged.
   *
   * @default true
   */
  draggable?: boolean;

  /**
   * Whether the element can receive drops.
   *
   * @default true
   */
  droppable?: boolean;

  /**
   * The drag effect to use.
   *
   * @default "move"
   */
  effectAllowed?: DataTransfer["effectAllowed"];

  /**
   * The drop effect to use.
   *
   * @default "move"
   */
  dropEffect?: DataTransfer["dropEffect"];

  /**
   * Data format for the transfer.
   *
   * @default "text/plain"
   */
  dataFormat?: string;
};

/**
 * Options for the dragDrop attachment that allows typing for the data property as
 * optional but if provided, it will be of type T.
 */
export type DragDropOptions<T = unknown> =
  | (DragDropCallbacks<T> & { data?: T } & options)
  | options;
