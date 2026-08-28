export type InputValue = string | string[];

export class TextTransformer {
  value: string;

  constructor(value: InputValue) {
    this.value = Array.isArray(value)
      ? value
          .filter(Boolean)
          .map((v) => v.trim())
          .join(" ")
      : (value ?? "").toString();
  }

  static with(items: string[], separator: string = ", "): string {
    if (!Array.isArray(items) || items.length === 0) return "";
    return items
      .filter((item) => item != null && item.trim() !== "")
      .map((item) => item.trim())
      .join(separator);
  }

  static commaDelimited(items: string[]): string {
    if (!Array.isArray(items) || items.length === 0) return "";
    return items
      .filter((item) => item != null && item.trim() !== "")
      .map((item) => item.trim())
      .join(", ");
  }

  static andDelimited(items: string[]): string {
    return items.join(" & ");
  }

  static plusDelimited(items: string[]): string {
    return items.join(" + ");
  }

  normalizeSpaces(): this {
    this.value = this.value.trim().replace(/\s+/g, " ");
    return this;
  }

  upperFirst(): this {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    return this;
  }

  lower(): this {
    this.value = this.value.toLowerCase();
    return this;
  }

  upper(): this {
    this.value = this.value.toUpperCase();
    return this;
  }

  title(): this {
    this.normalizeSpaces();
    this.value = this.value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    return this;
  }

  sentence(): this {
    this.normalizeSpaces();
    if (!this.value) return this;
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
    return this;
  }

  camel(): this {
    this.normalizeSpaces();
    this.value = this.value
      .toLowerCase()
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
    return this;
  }

  pascal(): this {
    this.normalizeSpaces();
    this.value = this.value
      .toLowerCase()
      .replace(/(?:^|[-_\s]+)(.)/g, (_, c) => (c ? c.toUpperCase() : ""));
    return this;
  }

  snake(): this {
    this.normalizeSpaces();
    this.value = this.value
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/[-\s]+/g, "_")
      .toLowerCase();
    return this;
  }

  kebab(): this {
    this.normalizeSpaces();
    this.value = this.value
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]+/g, "-")
      .toLowerCase();
    return this;
  }

  /**
   * Join items with a custom separator (default: ", ") Works on current value (space-separated) or
   * array passed to constructor
   */
  with(separator: string = ", "): this {
    const parts = this.value.split(/\s+/).filter(Boolean);
    this.value = parts.join(separator);
    return this;
  }

  and(): this {
    return this.with(" & ");
  }

  plus(): this {
    return this.with(" + ");
  }

  /** Join array items with commas (no trailing comma) */
  comma(): this {
    const parts = this.value.split(/\s+/).filter(Boolean);
    this.value = parts.join(", ");
    return this;
  }

  toString(): string {
    return this.value;
  }
}

/** Factory function */
export const textTransformer = (value: InputValue) => new TextTransformer(value);
