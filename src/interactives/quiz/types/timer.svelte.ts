import { type } from "arktype";

export const TimerPropsSchema = type({
  limit: "number>=0"
});

export type TimerProps = typeof TimerPropsSchema.infer;

export class Timer {
  readonly limit: number;

  private constructor(props: TimerProps) {
    this.limit = props.limit;
  }
}
