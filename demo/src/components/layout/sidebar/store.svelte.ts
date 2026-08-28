import ClockIcon from "@lucide/svelte/icons/clock";
import FolderIcon from "@lucide/svelte/icons/folder";
import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
import SendIcon from "@lucide/svelte/icons/send";
import Settings from "@lucide/svelte/icons/settings";
import UsersIcon from "@lucide/svelte/icons/users";
import type { Component } from "svelte";
import { SvelteMap } from "svelte/reactivity";

export type NavItem = {
  title: string;
  icon: Component;
  path?: string;
  selected?: boolean;
  fn?: (item: NavItem) => void;
};

export let projects = $state(
  new SvelteMap<string, NavItem>([
    [
      "projects",
      {
        title: "Projects",
        path: "/projects",
        icon: FolderIcon
      }
    ],
    [
      "recent",
      {
        title: "Recent Chats",
        path: "/recent",
        icon: ClockIcon
      }
    ],
    [
      "community",
      {
        title: "Community",
        path: "/community",
        icon: UsersIcon
      }
    ]
  ])
);

export let chats = $state(
  new SvelteMap<string, NavItem>([
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ],
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ],
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ],
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ],
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ],
    [
      "chats",
      {
        title: "Chats",
        icon: MessageCircleIcon,
        fn: () => {}
      }
    ]
  ])
);

export let system = $state(
  new SvelteMap<string, NavItem>([
    [
      "settings",
      {
        title: "Settings",
        icon: Settings,
        fn: () => {}
      }
    ],
    [
      "support",
      {
        title: "Support",
        path: "/support",
        icon: LifeBuoyIcon
      }
    ],
    [
      "feedback",
      {
        title: "Feedback",
        fn: () => {
          console.log("Feedback");
        },
        icon: SendIcon
      }
    ]
  ])
);
