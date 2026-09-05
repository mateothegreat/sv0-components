import ClockIcon from "~icons/lucide/clock";
import FolderIcon from "~icons/lucide/folder";
import LifeBuoyIcon from "~icons/lucide/life-buoy";
import MessageCircleIcon from "~icons/lucide/message-circle";
import SendIcon from "~icons/lucide/send";
import Settings from "~icons/lucide/settings";
import UsersIcon from "~icons/lucide/users";
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
