import type { Component } from "svelte";
import { nav as content } from "./content";
import { nav as display } from "./display";
import { nav as forms } from "./forms";
import { nav as interactives } from "./interactives";
import { nav as navigation } from "./navigation";
import { nav as typography } from "./typography";
import { nav as utilities } from "./utilities";

export class RouteGroup {
  label: string;
  path: string;
  components: RouteComponent[];
  icon?: Component;
  active? = $state(false);

  constructor(value: RouteGroup) {
    this.label = value.label;
    this.path = value.path;
    this.components = value.components;
    this.icon = value.icon;
  }
}

export type RouteComponent = {
  label?: string;
  path?: string;
  component?: Component;
  type?: "route" | "separator";
};

export const routes: RouteGroup[] = [
  new RouteGroup(content),
  new RouteGroup(display),
  new RouteGroup(typography),
  new RouteGroup(interactives),
  new RouteGroup(navigation),
  new RouteGroup(forms),
  new RouteGroup(utilities)
];

/**
 * Check if a URL is active.
 *
 * @param url - The URL to check.
 *
 * @returns True if the URL is active, false otherwise.
 */
export const isActive = (url1: string, url2: string): boolean => {
  return url1 === url2;
};

/**
 * Check if any sub-item in a group is active.
 *
 * @param groupItems - The group items to check.
 *
 * @returns True if any sub-item in the group is active, false otherwise.
 */
export const isGroupActive = (url1: string, groupItems: Array<{ url: string }>): boolean => {
  return groupItems.some((item) => isActive(url1, item.url));
};
