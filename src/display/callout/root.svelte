<script lang="ts">
  import CircleCheck from "~icons/lucide/circle-check";
import CircleX from "~icons/lucide/circle-x";
import FileText from "~icons/lucide/file-text";
import Info from "~icons/lucide/info";
import Lightbulb from "~icons/lucide/lightbulb";
import TriangleAlert from "~icons/lucide/triangle-alert";
import X from "~icons/lucide/x";
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";
  import type { CalloutIntent } from "./types";

  const {
    ...rest
  }: {
    intent?: CalloutIntent;
    dismissible?: boolean;
    dismissed?: () => void;
    icon?: typeof Icon | boolean;
    size?: "xs" | "sm" | "md" | "lg";
  } & WithOptionalClass &
    VariantProps<typeof styleSet> &
    WithChildren = $props();

  const built = usePropsBuilder(rest)
    .withDefaults({
      intent: "info",
      dismissible: false,
      icon: true,
      size: "sm"
    })
    .withClassMerge();

  const styleSet = createStyleSet({
    base: "flex items-center justify-between rounded-lg border p-3",
    variants: {
      intent: {
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
        error:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
        note: "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
        tip: "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100"
      },
      outer: {
        xs: "py-2 px-2.5 text-xs",
        sm: "py-2.5 px-3 text-sm",
        md: "p-3 text-base",
        lg: "p-5 text-lg"
      },
      inner: {
        xs: "gap-2",
        sm: "gap-2.5",
        md: "gap-3",
        lg: "gap-4"
      }
    },
    defaultVariants: {
      intent: "info",
      outer: "sm",
      inner: "sm"
    }
  });

  const style = styleSet(
    {
      intent: built.intent,
      outer: built.size,
      inner: built.size
    },
    built.class
  );

  let Icon: typeof Component;
  let iconStyle: string;

  if (built.icon) {
    if (typeof built.icon === "function") {
      Icon = built.icon;
    } else {
      switch (built.intent) {
        case "info":
          Icon = Info;
          break;
        case "success":
          Icon = CircleCheck;
          break;
        case "warning":
          Icon = TriangleAlert;
          break;
        case "error":
          Icon = CircleX;
          break;
        case "note":
          Icon = FileText;
          break;
        case "tip":
          Icon = Lightbulb;
          break;
        default:
          Icon = Info;
          break;
      }
    }
    iconStyle = createStyleSet({
      base: "",
      variants: {
        intent: {
          info: "text-blue-600 dark:text-blue-400",
          success: "text-green-600 dark:text-green-400",
          warning: "text-yellow-600 dark:text-yellow-400",
          error: "text-red-600 dark:text-red-400",
          note: "text-gray-600 dark:text-gray-400",
          tip: "text-purple-600 dark:text-purple-400"
        },
        size: {
          xs: "size-4.5",
          sm: "size-5",
          md: "size-6",
          lg: "size-7"
        }
      },
      defaultVariants: {
        intent: "info",
        size: "sm"
      }
    })({ intent: built.intent, size: built.size });
  }

  const dismissButtonStyleSet = createStyleSet({
    base: "rounded-sm opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring focus:ring-offset-2",
    variants: {
      intent: {
        info: "text-blue-900 hover:text-blue-950 focus:ring-blue-600 dark:text-blue-100 dark:hover:text-blue-50 dark:focus:ring-blue-400",
        success:
          "text-green-900 hover:text-green-950 focus:ring-green-600 dark:text-green-100 dark:hover:text-green-50 dark:focus:ring-green-400",
        warning:
          "text-yellow-900 hover:text-yellow-950 focus:ring-yellow-600 dark:text-yellow-100 dark:hover:text-yellow-50 dark:focus:ring-yellow-400",
        error:
          "text-red-900 hover:text-red-950 focus:ring-red-600 dark:text-red-100 dark:hover:text-red-50 dark:focus:ring-red-400",
        note: "text-gray-900 hover:text-gray-950 focus:ring-gray-600 dark:text-gray-100 dark:hover:text-gray-50 dark:focus:ring-gray-400",
        tip: "text-purple-900 hover:text-purple-950 focus:ring-purple-600 dark:text-purple-100 dark:hover:text-purple-50 dark:focus:ring-purple-400"
      }
    }
  });

  let isVisible = $state(true);

  const handleDismiss = () => {
    isVisible = false;
    built.dismissed?.();
  };

  let dismissButtonStyle: string;
  if (built.dismissible) {
    dismissButtonStyle = dismissButtonStyleSet({ intent: built.intent });
  }

  console.log(styleSet.variants.inner(built.size));
</script>

{#if isVisible}
  <div
    class={styleSet({
      intent: built.intent,
      outer: built.size,
      inner: built.size
    })}
    role="alert">
    <div class="flex items-center {styleSet.variants.inner(built.size)}">
      <Icon class={iconStyle}></Icon>
      <div>
        {@render built.children()}
      </div>
    </div>
    {#if built.dismissible}
      <button type="button" class={dismissButtonStyle} onclick={handleDismiss} aria-label="Dismiss">
        <X class="size-4" />
      </button>
    {/if}
  </div>
{/if}
