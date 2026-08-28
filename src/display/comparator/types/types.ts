import type { Component, Snippet } from "svelte";
import type { Cell } from "./cell.svelte";
import type { Footer } from "./footer.svelte";
import type { Header } from "./header.svelte";
import type { Row } from "./row.svelte";
import type { Section } from "./section.svelte";

/**
 * Defines the types supported for value properties.
 */
export type Value<T = any> = T;

/**
 * Defines the class type for the comparator.
 */
export type Class = string | string[];

/**
 * Defines the accessible scopes for the comparator.
 */
export type Scope = "header" | "footer" | "section" | "row" | "cell";

/**
 * Context type for all renderers.
 */
export type RendererContext = {
  this: HeaderContext | Footer | Section | Row | Cell;
};

/**
 * Renderer type that can be a snippet or a component.
 */
export type Renderer<C> = Snippet<[C]> | Component<{ context: C }>;

/**
 * Renderer types for each context.
 */
export type HeaderRenderer = Renderer<HeaderContext>;
export type FooterRenderer = Renderer<FooterContext>;
export type SectionRenderer = Renderer<SectionContext>;
export type RowRenderer = Renderer<RowContext>;
export type CellRenderer = Renderer<CellContext>;

/**
 * Context type for header renderers.
 */
export type HeaderContext = {
  this: Header;
};

/**
 * Context type for footer renderers.
 */
export type FooterContext = {
  this: Footer;
};

/**
 * Context type for section renderers.
 */
export type SectionContext = {
  header: Header;
  this: Section;
};

/**
 * Context type for row renderers.
 */
export type RowContext = {
  header: Header;
  this: Row;
};

/**
 * Context type for cell renderers.
 */
export type CellContext = {
  header: Header;
  row: Row;
  this: Cell;
};

/**
 * Event type that is passed to the callback for each event type (click, hover, etc) that is
 * provided to the comparator.
 */
export type ComparatorEvent<T extends Header | Footer | Section | Row | Cell> = {
  scope: Scope;
  event: Event;
  this: T;
};

export type HeaderEvent = ComparatorEvent<Header>;
export type SectionEvent = ComparatorEvent<Section>;
export type RowEvent = ComparatorEvent<Row>;
export type CellEvent = ComparatorEvent<Cell>;
export type FooterEvent = ComparatorEvent<Footer>;
