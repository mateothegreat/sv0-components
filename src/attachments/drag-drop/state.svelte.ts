export class DragDropState {
  data: unknown = null;
  setData<T>(data: T): void {
    this.data = data;
  }
  getData<T>(): T {
    return this.data as T;
  }
}

export const dragDropState = new DragDropState();
